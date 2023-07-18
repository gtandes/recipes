import { useAccount, useContractWrite, useWebSocketPublicClient } from "wagmi";
import ContractConfig from "../smart-contracts/deployments/chaos/DynamicNFT.json";



const CONTRACT_DEFAULTS = {
    abi: ContractConfig.abi,
    address: ContractConfig.address as `0x${string}`,
};
interface IState {
    address: string | undefined;
    balance: number | bigint;
    tokensOwned: {
        uri: string;
        tokenId: number | bigint;
    }[]
  }
export default function useAppData() {

    

    const wss = useWebSocketPublicClient();
    const { address } = useAccount();

    const getBalance = async () => {
        const res = await wss?.readContract({
            ...CONTRACT_DEFAULTS,
            functionName: "balanceOf",
            args: [address]
        });
        return res as bigint;
    }

    const getOwnedTokens = async() => {
        const balance = await getBalance();
        console.log("Address: ", address);
        const ownedTokenIds = await Promise.all(
            Array.from({ length: Number(balance)}, (_, i) => {
                return wss?.readContract({
                    ...CONTRACT_DEFAULTS,
                    functionName: "tokenOfOwnerByIndex",
                    args: [address, i]
                })
            }
        ));
        
        console.log("Owned Ids: ", ownedTokenIds);

        const tokenURIs = await Promise.all(
            Array.from({ length: ownedTokenIds.length }, (_, i) => {
                return wss?.readContract({
                    ...CONTRACT_DEFAULTS,
                    functionName: "tokenURI",
                    args: [(ownedTokenIds[i] as bigint) + BigInt(1)]
                })
            })
        );

        return tokenURIs.map((uri, i: number) => {
            return {
                uri,
                tokenId: ownedTokenIds[i]
            } as {
                uri: string,
                tokenId: bigint
            }
        });
    }

    const setup = async(state: IState, setState: any) => {
        setState({
            ...state,
            address,
            balance: await getBalance(),
            tokensOwned: await getOwnedTokens()
        });    
    }

    const safeMint = useContractWrite({
        ...CONTRACT_DEFAULTS,
        functionName: "safeMint",
        args: [address]
    });
    
    return {
        address,
        safeMint,
        setup,
        wss,
    }
}