import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { ethers } from "ethers";
import { ConnectionInfo } from "./contract-connection.types";
import { NetworkName } from "./network-connection.types";
import { FreenameContractConfig } from "../../resolver-providers/providers/freename/freename-resolver-provider.types";
import { FREENAME_CONTRACT_CONFS } from "../../resolver-providers/providers/freename/freename-resolver-provider.consts";

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

	public setMetaplex(arg?: string) {
		const connection = new Connection(clusterApiUrl("devnet"));
		if (arg) {
			const wallet: Keypair = Keypair.fromSecretKey(Buffer.from(arg));
			this._metaplex = new Metaplex(connection).use(keypairIdentity(wallet)).use(bundlrStorage());
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
	public async exists(tokenId: string): Promise<boolean> {
		if (this._ethers) {
			return await this._ethers.exist(tokenId);
		}
		if (this._metaplex) {
			return await !!this.findSolanaNft(tokenId);
		}
		return false;
	}

	public async get(arg: { key: string, tokenId?: string }): Promise<string | undefined> {
		const { key, tokenId } = arg || {};
		if (this._ethers) {
			return await this._ethers.getRecord(key, tokenId);
		}
		if (this._metaplex) {
			return await this.findSolanaNft(key);
		}
	}

	public async getMany(arg: { tokenId?: string, keys: string[] }): Promise<string[] | undefined> {
		const { tokenId, keys } = arg || {};
		if (this._ethers) {
			return await this._ethers.getManyRecords(keys, tokenId);
		}
		if (this._metaplex) {
			const _nftAddresses: PublicKey[] = keys.map(el => this._nftAddress({ nftName: el, programId: this._programId() }));
			const _nfts = await this._metaplex.nfts().findAllByMintList({ mints: _nftAddresses });
			const _nftsNames: (string | undefined)[] = _nfts?.map(el => el?.name);
			return _nftsNames as string[];
		}
	}

	public async getAllKeys(tokenId: string): Promise<string[] | undefined> {
		if (tokenId) {
			if (this._ethers) {
				return await this._ethers.getAllKeys(tokenId);
			}
		}
		return undefined;
	}
	/**
	 * Find specific SOLANA NFT by name
	 * @param arg 
	 * @returns 
	 */
	private async findSolanaNft(arg: string): Promise<string | undefined> {
		const _programId: PublicKey | undefined = this._programId();

		if (!_programId) return undefined;

		const nftAddress = this._nftAddress({ nftName: arg, programId: _programId });

		if (!nftAddress) return undefined;

		const _nft = await this._metaplex.nfts().findByMint({ mintAddress: nftAddress });
		return _nft?.name;
	}

	/************************** WRITING **************************/

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