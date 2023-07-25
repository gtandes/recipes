import { initializeCustodian } from "./utils";
import { createClient } from "./utils";
import { CUSTODIAN_PRIVATE_KEY, WSS_URL } from "./config";
import { parseEther } from "viem";

const DEFAULT_FILL_UP_VALUE: bigint = parseEther("0.00000002");

class Custodian {
    #nonce = 0;
    #custodian;
    #client;

    constructor() {
        this.#custodian = initializeCustodian(CUSTODIAN_PRIVATE_KEY as `0x${string}`);
        this.#client = createClient(WSS_URL);
    }

    public get custodian() {
        return this.#custodian;
    }

    public get client() {
        return this.#client;
    }

    public async isValidCustodian() {
        const balance = await this.#client.getBalance({
            address: this.#custodian.account.address
        });

        if (balance < parseEther("0.00005")) {
            throw new Error("Custodian Balance must be > 0.00005");
        }

        this.#nonce = await this.#client.getTransactionCount({
            address: this.#custodian.account.address
        });
    }

    public async distribute(to: `0x${string}`) {
        const hash = await this.#custodian.sendTransaction({
            to,
            value: DEFAULT_FILL_UP_VALUE,
            nonce: this.#nonce++
        });
        const tx = await this.#client.waitForTransactionReceipt({
            hash
        });
    }
}

export default new Custodian();