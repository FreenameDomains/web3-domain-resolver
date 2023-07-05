import { ethers } from "ethers";
import { NetworkConnection } from "./network-connection.types";
import { Sft, SftWithToken, Nft, NftWithToken } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

export type Transaction = ethers.providers.TransactionResponse;

export type Receipt = ethers.providers.TransactionReceipt;

export type _publicKey = PublicKey | null;

export type _nft = Sft | SftWithToken | Nft | NftWithToken | undefined;

export type _string = string | undefined;

export interface ConnectionInfo {
  network: NetworkConnection;
  address: string;
  abi?: ethers.ContractInterface;
}
