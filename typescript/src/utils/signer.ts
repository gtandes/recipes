import { WSS_URL } from '../config';
import { createWalletClient, webSocket } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

export function createSigner() {
    const account = privateKeyToAccount(generatePrivateKey());
    const transport = webSocket(WSS_URL);

    const client = createWalletClient({
      account,
      transport
    });

    return client;
}