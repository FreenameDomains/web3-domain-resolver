import { Metaplex, Nft, NftWithToken, Sft, SftWithToken, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { BigNumber, ethers } from "ethers";
import { ConnectionInfo } from "./contract-connection.types";
import { NetworkName } from "./network-connection.types";
import { FreenameContractConfig } from "../../resolver-providers/providers/freename/freename-resolver-provider.types";
import { FREENAME_CONTRACT_CONFS } from "../../resolver-providers/providers/freename/freename-resolver-provider.consts";
import _ from "lodash";

export abstract class ContractFactory {


	private constructor() {
		// Private couse static class
	}

	public static createContract(arg?: ConnectionInfo): Contract {
		const contract = new Contract();
		if (arg) {
			contract.setEthers(arg);
			contract.setMetaplex();
		}
		return contract;
	}

}

export class Contract {

	private _ethers!: ethers.Contract;
	private _metaplex!: Metaplex;

	public constructor() {
		//
	}

	/************************** SETTINGS **************************/

	public setEthers(arg: ConnectionInfo) {
		const { network, address, abi } = arg || {};
		if (abi && !(network instanceof Connection)) {
			const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
			this._ethers = new ethers.Contract(address, abi, provider);
		}
	}

	public setMetaplex(arg?: string | Keypair) {
		const connection = new Connection(clusterApiUrl("devnet"));
		if (typeof arg !== "undefined" && typeof arg !== "string") {
			// const wallet: Keypair = Keypair.fromSecretKey(Buffer.from(arg));
			this._metaplex = new Metaplex(connection).use(keypairIdentity(arg)).use(bundlrStorage());
			return;
		}
		this._metaplex = new Metaplex(connection);
	}

	public connect(signer: string | ethers.Signer): Contract {
		if (typeof signer !== "string") {
			this._ethers.connect(signer);
		} else {
			this.setMetaplex(signer);
		}
		return this;
	}

	/************************** READING **************************/
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async exists(tokenId: string): Promise<boolean> {
		let result = false;
		if (this._ethers) {
			result = await this._ethers.exist(tokenId);
		}
		if (this._metaplex && !result) {
			result = await !!this._findSolanaNft(tokenId);
		}
		return result;
	}
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	public async get(arg: { key: string, tokenId?: string }): Promise<string | undefined> {
		const { key, tokenId } = arg || {};
		let result: string | undefined = undefined;
		if (this._ethers && tokenId) {
			result = await this._ethers.getRecord(key, tokenId);
		}
		if (this._metaplex && !result) {
			const _nft = await this._findSolanaNft(key);
			if (!_nft) return undefined;
			const _nftName: string | undefined = _nft?.name;
			result = JSON.stringify(_nft);
		}
		return result;
	}
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	public async getMany(arg: { tokenId?: string, keys: string[] }): Promise<string[] | undefined> {
		const { tokenId, keys } = arg || {};
		let result: string[] | undefined = undefined;
		if (this._ethers && tokenId) {
			result = await this._ethers.getManyRecords(keys, tokenId);
		}
		if (this._metaplex && (!result || Array.isArray(result) && result.length == 0)) {
			const _nftAddresses: PublicKey[] = keys.map(el => this._nftAddress({ nftName: el, programId: this._programId() }));
			const _nfts = await this._metaplex.nfts().findAllByMintList({ mints: _nftAddresses });
			const _nftsNames: (string | undefined)[] = _nfts?.map(el => el?.name);
			result = _nftsNames as string[];
		}
		return result;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async getAllKeys(tokenId: string): Promise<string[] | undefined> {
		if (tokenId) {
			if (this._ethers) {
				return await this._ethers.getAllKeys(tokenId);
			}
		}
		return undefined;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async available(tokenId: string): Promise<boolean> {
		if (this._ethers) {
			return await this._ethers.available(tokenId);
		}
		if (this._metaplex) {
			const _nft = await this._findSolanaNft(tokenId);
			if (!_nft) return true;
		}
		return false;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async reverseOf(tokenId: string): Promise<BigNumber | string | undefined> {
		if (this._ethers) {
			return await this._ethers.reverseOf(tokenId);
		}
		if (this._metaplex) {
			const _nft = await this._findSolanaNft(tokenId);
		}
		return undefined;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async tokenURI(tokenId: string): Promise<string | undefined> {
		if (this._ethers) {
			return await this._ethers.tokenUri(tokenId);
		}
		if (this._metaplex) {
			const _nft = await this._findSolanaNft(tokenId);
			if (!_nft) return undefined;
			return _nft?.uri;
		}
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async ownerOf(tokenId: string): Promise<string | undefined> {
		let result: string | undefined = undefined;
		if (this._ethers) {
			result = await this._ethers.ownerOf(tokenId);
			console.log("ETHERS OWNER OF:" + result);
		}
		if (this._metaplex && !result) {
			const connection = new Connection(clusterApiUrl("devnet")); // Replace with the desired Solana network endpoint
			const tokenPublicKey = new PublicKey(tokenId); // Assuming `tokenId` is the token's public key
			const largestAccounts = await connection.getTokenLargestAccounts(tokenPublicKey);
			const largestAccountInfo = await connection.getParsedAccountInfo(
				largestAccounts.value[0].address,  //first element is the largest account, assumed with 1 
			);
			if (largestAccountInfo?.value) {
				result = (largestAccountInfo.value.data as any).parsed.info.owner;
			}
		}
		return result;
	}

	/**
	 * Checks on the SOLANA blockchain registry if the given address is the owner or an approved address for the resolved resource NFT.
	 */
	public async isApprovedOrOwner(arg: { tokenId: string, address: string }): Promise<boolean> {
		const { tokenId, address } = arg || {};
		let result = false;
		if (this._ethers) {
			result = await this._ethers.isApprovedOrOwner(tokenId, address);
		}
		if (this._metaplex && !result) {
			const ownerAddress = await this.ownerOf(tokenId);
			if (!ownerAddress) return false;
			if (ownerAddress === address) return true;
		}
		return result;
	}

	/**
	 * Find specific SOLANA NFT by name
	 * @param arg 
	 * @returns 
	 */
	private async _findSolanaNft(arg: string): Promise<Sft | SftWithToken | Nft | NftWithToken | undefined> {
		const _programId: PublicKey | undefined = this._programId();

		if (!_programId) return undefined;

		const nftAddress = this._nftAddress({ nftName: arg, programId: _programId });

		if (!nftAddress) return undefined;

		const _nft = await this._metaplex.nfts().findByMint({ mintAddress: nftAddress });
		return _nft;
	}

	/************************** WRITING **************************/

	public async transferFrom(address: string, addressTo: string, tokenId: string): Promise<any> {
		if (this._ethers) {
			return await this._ethers.transferFrom(address, addressTo, tokenId);
		}
		return;
	}

	public async approve(address: string, tokenId: string): Promise<any> {
		if (this._ethers) {
			return await this._ethers.approve(address, tokenId);
		}
		return;
	}

	public async set(key: string, value: string, tokenId: string): Promise<any> {
		if (this._ethers) {
			return await this._ethers.setRecord(key, value, tokenId);
		}
		return;
	}

	public async setMany(keys: string[], values: string[], tokenId: string): Promise<any> {
		if (this._ethers) {
			return await this._ethers.setManyRecord(keys, values, tokenId);
		}
		return;
	}

	public async setReverse(tokenId: string): Promise<any> {
		if (this._ethers) {
			return await this._ethers.setReverse(tokenId);
		}
		return;
	}

	/*************************** TOOLS ***************************/
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	private _nftAddress(arg: { nftName: string, programId: PublicKey, collectionMintPDA?: Buffer, mintBuffer?: Buffer, }): PublicKey {
		const { nftName, programId, collectionMintPDA, mintBuffer } = arg || {};

		const _nftBuffer: Buffer = this._nftNameBuffer(nftName);
		const _mintBuffer: Buffer = mintBuffer || this._defMintBuffer();
		const _collectionMintBuffer: Buffer = collectionMintPDA || this._collectionMintBuffer(programId);

		const [nftAddress] = PublicKey.findProgramAddressSync([_mintBuffer, _collectionMintBuffer, _nftBuffer], programId);
		return nftAddress;
	}
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	private _collectionMintBuffer(arg: PublicKey): Buffer {
		const [collectionMintPDA] = PublicKey.findProgramAddressSync([Buffer.from("collection_mint")], arg);
		return collectionMintPDA?.toBuffer();
	}
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	private _programId(arg = "read"): PublicKey {
		const contractConf: FreenameContractConfig | undefined = FREENAME_CONTRACT_CONFS.find(el => el.networkName == NetworkName.SOLANA && el.type == arg);
		if (!contractConf) return new PublicKey("FPvXvNtFUgnbJM6d8FTGKzKLeWQADYosLgcEuRDcRwX2");
		const programId: string = contractConf.address;
		const _programId: PublicKey = new PublicKey(programId);
		return _programId;
	}
	/**
	 * 
	 * @returns 
	 */
	private _defMintBuffer(): Buffer { return Buffer.from("mint"); }
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	private _nftNameBuffer(arg: string): Buffer { return Buffer.from(arg); }





}