import { Wallet, AnchorProvider, Program, web3, setProvider, BN } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { IDL } from "../../shared/constants/idl-json";
import { getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const network = clusterApiUrl("devnet");
const connection = new Connection(network);
const providerConfig: web3.ConfirmOptions = {
	skipPreflight: false,
	commitment: "finalized",
	preflightCommitment: "finalized",
	maxRetries: 3,
};
export class SolanaContractConnection {

	private _provider: AnchorProvider | null = null;
	private _wallet: Wallet | null = null;
	private _program: Program | null = null;
	private _programId: PublicKey = new PublicKey("6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL");

	public constructor(arg: Wallet) {
		if (arg) {
			try {
				this._wallet = arg;
				this._setAncorProvider(arg);
				const idlJson: string = JSON.stringify(IDL);
				this._program = new Program(JSON.parse(idlJson), this._programId, this._provider as any);

			} catch (error) {
				throw new Error(error as any);
			}
		}
	}

	private _setAncorProvider(arg: Wallet): void {
		this._provider = new AnchorProvider(
			connection,
			arg,
			providerConfig,
		);
		setProvider(this._provider);
	}

	public async setRecords(keys: string[], values: string[], nftName: string): Promise<boolean> {
		try {
			if (this._program && this._wallet) {
				const nsState: PublicKey = this._getNsStatePDA(this._program);
				const nftNsRecordMetadata: PublicKey = this._getNftNsRecordMetadata({ nftName, program: this._program });
				const nsRecordMetadata = await this._program.account.nsRecordMetadata.fetch(nftNsRecordMetadata);
				const account = {
					nsRecordMetadata: nftNsRecordMetadata,
					nsRecordData: (nsRecordMetadata as any).account,
					rent: web3.SYSVAR_RENT_PUBKEY,
					systemProgram: web3.SystemProgram.programId,
					nsState: nsState,
				};
				const tx = await this._program.methods
					.updateRecords(nftName, keys, values, [], new BN("1024"))
					.accounts(account)
					.rpc();
				if (tx) {
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}

	public async transfer(addressTo: string, nftName: string): Promise<boolean> {
		try {
			if (this._program && this._wallet && this._provider) {
				const nftMintPDA = this._getNftMintPDA({ program: this._program, nft: { name: nftName } });
				console.log("NFT MINT", nftMintPDA.toBase58());
				const nftTokenAccount = getAssociatedTokenAddressSync(
					nftMintPDA,
					this._provider.wallet.publicKey
				);
				console.log("ADDRESS SENDER", nftTokenAccount.toBase58());

				const recipientTokenAccount = getAssociatedTokenAddressSync(
					nftMintPDA,
					new PublicKey(addressTo)
				);
				// const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
				// 	this._provider.connection,
				// 	this._wallet.payer,
				// 	nftMintPDA,
				// 	keypair.publicKey
				// );
				const receiverAccount = await this._provider.connection.getAccountInfo(recipientTokenAccount);
				console.log("RECIPIENT ACCOUNT", receiverAccount);
				console.log("RECIPIENT TOKEN ACCOUNT", recipientTokenAccount.toBase58());
				const nftNsRecordMetadata = this._getNftNsRecordMetadata({ nftName, program: this._program });
				console.log("NFT NS RECORD METADATA", nftNsRecordMetadata.toBase58());
				const nsStatePDA = this._getNsStatePDA(this._program);
				console.log("NS STATE", nsStatePDA.toBase58());
				const nsRecordData = await this._program.account.nsRecordMetadata.fetch(
					nftNsRecordMetadata
				);
				console.log("NS RECORD DATA", nsRecordData);
				console.log("Payer", this._wallet.payer.publicKey.toBase58());
				console.log("TRY TRANSFER");

				const tx = await this._program.methods
					.transferNft(nftName)
					.accounts({
						mint: nftMintPDA,
						recipient: recipientTokenAccount,
						sender: nftTokenAccount,
						payer: this._wallet.publicKey,
						nsRecordMetadata: nftNsRecordMetadata,
						nsRecordData: (nsRecordData as any).account,
						nsState: nsStatePDA,
					}).signers([this._wallet.payer]).rpc();
				if (tx) {
					console.log("TRANSFER DONE");
					return true;
				}
				console.log("TRANSFER FAILED");
				return false;
			}
		} catch (e) {
			console.log("ERROR DURING TRANSFER", e);
			return false;
		}
		return false;
	}



	/**
			* 
			* @param program 
			* @returns 
			*/
	private _getCollectionMintPDA(program: Program): PublicKey {
		const arg = [Buffer.from("collection_mint")];
		const [collectionMintPDA] = PublicKey.findProgramAddressSync(arg, program.programId);
		return collectionMintPDA;
	}
	/**
		* 
		* @param program 
		* @returns 
		*/
	private _getNsStatePDA(program: Program): PublicKey {
		const [nsStatePDA] = web3.PublicKey.findProgramAddressSync([Buffer.from("ns_state")], program.programId);
		return nsStatePDA;
	}
	/**
		* 
		* @param program 
		* @returns 
		*/
	private _getNsAuthorityPDA(program: Program): PublicKey {
		const [nsAuthorityPDA] = PublicKey.findProgramAddressSync([Buffer.from("ns_authority")], program.programId);
		return nsAuthorityPDA;
	}
	/**
		* 
		* @param arg
		*/
	private _getNftNsRecordMetadata(arg: { nftName: string, program: Program }): PublicKey {
		const { nftName, program } = arg;
		const [nftNsRecordMetadata] = PublicKey.findProgramAddressSync([Buffer.from("ns_record"), Buffer.from("ns_metadata"), Buffer.from(nftName)], program.programId);
		return nftNsRecordMetadata;
	}
	/**
		* 
		* @param arg
		*/
	private _getNftNsPropertyMetadata(arg: { nftName: string, program: Program }): PublicKey {
		const { nftName, program } = arg;
		const [nftNsRecordMetadata] = PublicKey.findProgramAddressSync([Buffer.from("ns_property"), Buffer.from("ns_metadata"), Buffer.from(nftName)], program.programId);
		return nftNsRecordMetadata;
	}
	/**
		* 
		* @param arg 
		* @returns 
		*/
	private _getNftMintPDA(arg: { program: Program, nft: { name: string } }): PublicKey {
		const { program, nft } = arg;
		const collectionMintPDA: PublicKey = this._getCollectionMintPDA(program);
		const _arg = [Buffer.from("mint"), collectionMintPDA.toBuffer(), Buffer.from(nft.name)];
		const [nftMintPDA] = PublicKey.findProgramAddressSync(_arg, program.programId);
		return nftMintPDA;
	}
	/**
		* 
		* @param arg 
		* @returns 
		*/
	private _getTldNftMintPDA(arg: { program: Program, nft: string }): PublicKey {
		const { program, nft } = arg;
		const collectionMintPDA: PublicKey = this._getCollectionMintPDA(program);
		const [nftMintPDA] = PublicKey.findProgramAddressSync([Buffer.from("mint"), collectionMintPDA.toBuffer(), Buffer.from(nft)], program.programId);
		return nftMintPDA;
	}

}