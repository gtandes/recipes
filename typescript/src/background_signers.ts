import { WalletClient, getAddress, parseAbi } from "viem";
import Custodian from "./custodian";
import { createSigner } from "./utils";
import { skaleChaosTestnet } from "viem/chains";
import { Contract } from "./contract";

class BackgroundSigners {
    #custodian: typeof Custodian;
    #signers: {[key: string]: WalletClient} = {};

    constructor() {
        this.#custodian = Custodian;
    }

    
    public async getUser(userId: string) {
        if (this.#signers[userId] === undefined) {
            const signer = createSigner();
            this.#signers[userId] = signer;
            await this.#custodian.distribute(signer.account.address);
            
        }
        
        return this.#signers[userId].account?.address as `0x${string}`;
    }

    public async remove(userId: string) {
        const account = this.#signers[userId].account;
        if (!account) return;
        this.#signers[userId].sendTransaction({
            to: this.#custodian.custodian.account.address,
            value: BigInt(1),
            type: "legacy",
            account,
            chain: skaleChaosTestnet
        });
    }

    public async backgroundSignerAction(userId: string, args: any[], functionName: "mint" | "burn") {
        const account = this.#signers[userId].account;
        if (!account) throw new Error("Account Not Found");

        await this.#signers[userId].writeContract({
            abi: Contract.abi,
            address: getAddress(Contract.address),
            functionName,
            args,
            account,
            chain: skaleChaosTestnet
        })
    }
}

export default new BackgroundSigners();