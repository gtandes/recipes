import { JsonRpcProvider, Wallet } from "ethers";

import { DISTRIBUTION_VALUE, PRIVATE_KEY, RPC_URL } from "./config";

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

interface DistributeParams {
  address: string;
}

async function Distribute({ address }: DistributeParams) {
  try {
    return await wallet.sendTransaction({
      to: address,
      value: DISTRIBUTION_VALUE,
    });
  } catch (error) {
    console.error("Distribute error:", error);
    throw error;
  }
}

export default Distribute;
