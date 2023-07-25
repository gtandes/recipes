import { createPublicClient, webSocket } from "viem";
import { skaleChaosTestnet } from "viem/chains";

export function createClient(wssUrl: string) {
    const transport = webSocket(wssUrl)

    const client = createPublicClient({
      chain: skaleChaosTestnet, 
      transport,
    });

    return client;
}