import {useAccount} from "wagmi";
import { AnonymousPoW } from "@skaleproject/pow-ethers";
import { useSignal} from "@preact/signals-react";
import {JsonRpcProvider} from "@ethersproject/providers";
import {parseEther} from "ethers/lib/utils.js";

const CONTRACT_ADDRESS: string = "0x84b7265Bc964BB69b4275d4Dac4df0FD87556960" as const;
const FUNCTION_HASH: string = "0x0c11dedd" as const;
const RPC_URL: string = "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar" as const;

type Status = "normal" | "filling" | "filled";

export default function useSKALEFuel() {
	
	const { address } = useAccount();

	const status = useSignal<Status>("normal");
	const connection = new AnonymousPoW({ rpcUrl: RPC_URL });
	const provider = new JsonRpcProvider(RPC_URL);

	
	const checkAndFill = async(account: string) => {
		status.value = "filling";
		const balance = await provider.getBalance(account);
		if (balance > parseEther("0.00005")) return;

		await connection.send({
			to: CONTRACT_ADDRESS,
			data: FUNCTION_HASH + "000000000000000000000000" + account.substring(2)
		});

		status.value = "filled";
	}

	return { address, checkAndFill, status }

}
