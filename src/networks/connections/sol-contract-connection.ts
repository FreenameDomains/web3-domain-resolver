// import { PublicKey } from "@metaplex-foundation/js";
// import { Connection, clusterApiUrl } from "@solana/web3.js";
// import { ContractConnection } from "./contract-connection";
// import { ConnectionInfo } from "./contract-connection.types";
// import { Contract } from "./contract";

// export class SolanaContractConnection extends ContractConnection {

// 	public override _connection: Connection = new Connection(clusterApiUrl("devnet"));

// 	public constructor(arg: ConnectionInfo) {
// 		super(arg);
// 		console.log("initialized	SolanaContractConnection");
// 		this._contract = new Contract();
// 		this._contract.setMetaplex();
// 	}


// 	public async findNft(arg = "freename"): Promise<void> {
// 		const programId = "FPvXvNtFUgnbJM6d8FTGKzKLeWQADYosLgcEuRDcRwX2";
// 		const _programId: PublicKey = new PublicKey(programId);
// 		const [collectionMintPDA] = await PublicKey.findProgramAddressSync([Buffer.from("collection_mint")], _programId);
// 		console.log(collectionMintPDA.toString());
// 		const collectionMintPDABuffer = collectionMintPDA.toBuffer();
// 		const mintBuffer: Uint8Array | Buffer = Buffer.from("mint");
// 		const nftName: Buffer = Buffer.from(arg);
// 		const [nftAddress] = await PublicKey.findProgramAddressSync([mintBuffer, collectionMintPDABuffer, nftName], _programId);
// 		console.log(nftAddress.toString());
// 		const _nft = await this._contract.get({ key: arg });
// 		console.log(_nft);
// 		const owner = await this._contract.ownerOf(nftAddress.toString());
// 		console.log("OWNER ADDRESS: ", owner);
// 	}

// }