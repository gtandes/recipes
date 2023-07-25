import { WSS_URL } from '../config';
import { createWalletClient, webSocket } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { skaleChaosTestnet } from 'viem/chains';

export function initializeCustodian(privateKey: `0x${string}`) {
    return createWalletClient({
        account: privateKeyToAccount(privateKey),
        chain: skaleChaosTestnet,
        transport: webSocket(WSS_URL)
    });
}