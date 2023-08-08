import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { ContractInterface, ethers } from "ethers";
import { NameTools } from "../../shared/tools/name-tools";
import { Wallet } from "@project-serum/anchor";
import { IResolvedResource } from "../../shared/interfaces/resolved-resource.interface";
import { SolanaContractConnection } from "./sol-contract-connection";
import { NetworkName } from "../../shared/enumerations/enumerations";
import { _string, _nft, _publicKey, _receipt, _transaction } from "../../shared/types/shared.types";
import { ConnectionInfo } from "../../shared/interfaces/connection-info.interface";

export class Contract {

	private _ethers: ethers.Contract | null = null;
	private _metaplex: Metaplex | null = null;
	private _solanaContract: SolanaContractConnection | null = null;
	private _connectionInfo: ConnectionInfo | null = null;

	public constructor() {
		//
	}

	/************************** SETTINGS **************************/

	/**
	 * Set the ethers contract
	 * @param arg 
	 */
	public setEthers(arg: ConnectionInfo): void {
		const { network, address, abi } = arg || {};
		if (abi && !(network instanceof Connection)) {
			const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
			this._ethers = new ethers.Contract(address, abi, provider);
			this._connectionInfo = arg;
		}
	}
	/**
	 * Set the metaplex instance
	 * @param arg 
	 * @returns 
	 */
	public setMetaplex(arg: ConnectionInfo): void {
		let env: "devnet" | "mainnet-beta" | null = null;
		switch (arg?.network.networkName) {
			case NetworkName.SOLANA_DEVNET:
				env = "devnet";
				break;
			case NetworkName.SOLANA:
				env = "mainnet-beta";
				break;
			default:
				env = null;
				break;
		}
		if (!env) return;
		const connection = new Connection(clusterApiUrl(env));
		this._metaplex = new Metaplex(connection);
		this._connectionInfo = arg;
	}
	/**
	 * Connect the contract to a signer
	 * @param signer 
	 * @returns 
	 */
	public connect(signer: Wallet | ethers.Signer): Contract {
		if (this._ethers && this._connectionInfo) {
			this._ethers = new ethers.Contract(this._connectionInfo.address, this._connectionInfo.abi as ContractInterface, signer as ethers.Signer); // this.ethers.connect(signer);
		}
		if (this._metaplex) {
			this._solanaContract = new SolanaContractConnection(signer as Wallet);
		}
		return this;
	}
	/**
	 * Disconnect the contract from signer 
	 * @returns 
	 */
	public disconnect(): Contract {
		if (this._ethers && this._connectionInfo) {
			this.setEthers(this._connectionInfo);
		}
		if (this._metaplex) this._solanaContract = null;
		return this;
	}

	/************************** READING **************************/
	/**
	 * Retrun true if the given tokenId exists
	 * @param tokenId 
	 * @returns 
	 */
	public async exists(tokenId: string): Promise<boolean> {
		let result = false;
		if (this._ethers) {
			const _tokenId = await this.generateEVMTokenId(tokenId);
			try {
				result = await this._ethers.exists(_tokenId);
			} catch (error) {
				result = false;
			}
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
	public async get(arg: { key: string, tokenId: string }): Promise<_string> {
		const { key, tokenId } = arg || {};
		let result: _string;
		if (this._ethers) {
			const _tokenId = await this.generateEVMTokenId(tokenId);
			result = await this._ethers.getRecord(key, _tokenId);
		}
		if (this._metaplex) {
			const _nft = await this._findSolanaNft(tokenId);
			if (!_nft) return undefined;
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
			const _nftAddresses: PublicKey[] = keys.map(el => this._nftAddress({ nftName: el, programId: this._programId() as PublicKey })).filter(el => el !== null) as PublicKey[];
			const _nfts = await this._metaplex.nfts().findAllByMintList({ mints: _nftAddresses });
			const _nftsNames: (_string)[] = _nfts?.map(el => el?.name);
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
		let result = false;
		if (this._ethers) {
			const _tokenId = await this.generateEVMTokenId(tokenId);
			result = await this._ethers.available(_tokenId);
		}
		if (this._metaplex && !result) {
			const _nft: _nft = await this._findSolanaNft(tokenId);
			if (!_nft) return true;
		}
		return result;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async reverseOf(tokenId: string): Promise<_string> {
		let result: _string = undefined;
		if (this._ethers) {
			result = await this._ethers.reverseOf(tokenId);
		}
		if (this._metaplex && !result) {
			const nftAddress: PublicKey = new PublicKey(tokenId);
			const _nft = await this._metaplex.nfts().findByMint({ mintAddress: nftAddress });
			if (_nft) result = JSON.stringify(_nft);
		}
		return result;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async tokenURI(tokenId: string): Promise<_string> {
		let result: _string = undefined;
		if (this._ethers) {
			const _tokenId = await this.generateEVMTokenId(tokenId);
			result = await this._ethers.tokenURI(_tokenId);
		}
		if (this._metaplex && !result) {
			const _nft = await this._findSolanaNft(tokenId);
			result = _nft?.uri;
		}
		return result;
	}
	/**
	 * 
	 * @param tokenId 
	 * @returns 
	 */
	public async ownerOf(tokenId: string): Promise<_string> {
		let result: _string = undefined;
		if (this._ethers) {
			const _tokenId = await this.generateEVMTokenId(tokenId);
			try {
				result = await this._ethers.ownerOf(_tokenId);
			} catch (error) {
				result = undefined;
			}
		}
		if (this._metaplex && !result) {
			const connection = new Connection(clusterApiUrl("devnet")); // Replace with the desired Solana network endpoint
			const isBase58 = (value: string) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
			const tokenPublicKey = isBase58(tokenId) ? new PublicKey(tokenId) : await this._nftAddress({ nftName: tokenId, programId: this._programId() as PublicKey });
			if (tokenPublicKey) {
				const largestAccounts = await connection.getTokenLargestAccounts(tokenPublicKey);
				const largestAccountInfo = await connection.getParsedAccountInfo(
					largestAccounts.value[0].address,  //first element is the largest account, assumed with 1 
				);
				if (largestAccountInfo?.value) {
					result = (largestAccountInfo.value.data as any).parsed.info.owner;
				}
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
			const _tokenId = await this.generateEVMTokenId(tokenId);
			result = await this._ethers.isApprovedOrOwner(_tokenId, address);
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
	private async _findSolanaNft(arg: string): Promise<_nft> {
		try {
			const _programId: PublicKey = this._programId() as PublicKey;
			const nftAddress: _publicKey = this._nftAddress({ nftName: arg, programId: _programId });

			if (!nftAddress) return undefined;
			if (this._metaplex) {
				const _nft: _nft = await this._metaplex.nfts().findByMint({ mintAddress: nftAddress });
				return _nft;
			}
		} catch (error) {
			return undefined;
		}
	}

	/************************** WRITING **************************/

	public async transferFrom(address: string, addressTo: string, tokenId: string): Promise<boolean> {
		let result = false;
		try {
			if (this._ethers) {
				const tx: _transaction = await this._ethers.transferFrom(address, addressTo, tokenId);
				const approved: _receipt = await tx.wait();
				if (approved) result = true;
			}
			if (this._solanaContract) {
				result = await this._solanaContract.transfer(addressTo, tokenId);
			}
		} catch (error) {
			result = false;
		}
		this.disconnect();
		return result;
	}

	public async approve(address: string, tokenId: string): Promise<boolean> {
		let result = false;
		if (this._ethers) {
			try {
				const tx: _transaction = await this._ethers.approve(address, tokenId);
				const approved: _receipt = await tx.wait();
				if (approved) result = true;
			} catch (error) {
				result = false;
			}
		}
		this.disconnect();
		return result;
	}

	public async set(key: string, value: string, tokenId: string): Promise<boolean> {
		let result = false;
		if (this._ethers) {
			try {
				const tx: _transaction = await this._ethers.setRecord(key, value, tokenId);
				const approved: _receipt = await tx.wait();
				if (approved) result = true;
			} catch (error) {
				result = false;
			}
		}
		this.disconnect();
		return result;
	}

	public async setMany(keys: string[], values: string[], resource: IResolvedResource): Promise<boolean> {
		let result = false;
		try {
			if (this._ethers) {
				const tx: _transaction = await this._ethers.setManyRecords(keys, values, resource.tokenId);
				const approved: _receipt = await tx.wait();
				if (approved) result = true;
			}
			if (this._solanaContract) {
				result = await this._solanaContract.setRecords(keys, values, resource.fullname);
			}
		} catch (error) {
			result = false;
		}
		this.disconnect();
		return result;
	}

	public async setReverse(tokenId: string): Promise<boolean> {
		let result = false;
		if (this._ethers) {
			try {
				const tx: _transaction = await this._ethers.setReverse(tokenId);
				const approved: _receipt = await tx.wait();
				if (approved) result = true;
			} catch (error) {
				result = false;
			}
		}
		this.disconnect();
		return result;
	}

	/*************************** TOOLS ***************************/

	public getTokenId(arg: string): _string {
		if (this._connectionInfo) {
			switch (this._connectionInfo.network.networkName) {
				case NetworkName.SOLANA:
				case NetworkName.SOLANA_DEVNET:
					if (this._programId()) {
						return this._nftAddress({ nftName: arg, programId: this._programId() as PublicKey })?.toBase58();
					}
					return undefined;
				default:
					return this.generateEVMTokenId(arg);
			}
		}
	}
	/**
	 * 
	 * @param arg 
	 * @returns 
	 */
	private _nftAddress(arg: { nftName: string, programId: PublicKey, collectionMintPDA?: Buffer, mintBuffer?: Buffer, }): PublicKey | null {
		try {
			const { nftName, programId, collectionMintPDA, mintBuffer } = arg || {};

			const _nftBuffer: Buffer = this._nftNameBuffer(nftName);
			const _mintBuffer: Buffer = mintBuffer || this._defMintBuffer();
			const _collectionMintBuffer: Buffer = collectionMintPDA || this._collectionMintBuffer(programId);

			const [nftAddress] = PublicKey.findProgramAddressSync([_mintBuffer, _collectionMintBuffer, _nftBuffer], programId);
			return nftAddress;
		} catch (error) {
			return null;
		}
	}

	private generateEVMTokenId(tokenId: string): _string {
		const mappedName = NameTools.mapName(tokenId);
		if (!mappedName) {
			return undefined;
		}
		let fullnameKeccak: string;
		if (mappedName.domain) {
			const domainKeccak = ethers.utils.solidityKeccak256(["string"], [mappedName.domain]);
			fullnameKeccak = ethers.utils.solidityKeccak256(["string", "uint256"], [mappedName.tld, domainKeccak]);
		} else {
			fullnameKeccak = ethers.utils.solidityKeccak256(["string"], [mappedName.tld]);
		}
		if (fullnameKeccak) {
			const tokenId = ethers.BigNumber.from(fullnameKeccak).toString();
			return tokenId;
		}
		return undefined;
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
	private _programId(): PublicKey | null {
		if (this._connectionInfo) return new PublicKey(this._connectionInfo.address);
		return null;
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