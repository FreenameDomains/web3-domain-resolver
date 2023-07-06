import { ethers } from "ethers";
import { NetworkConnection } from "../types/connection.types";

export interface ConnectionInfo {
  network: NetworkConnection;
  address: string;
  abi?: ethers.ContractInterface;
}