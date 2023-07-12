import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import dotenv from "dotenv";
import "./tasks";


/*
 * Allows the script to access process.env
 */
dotenv.config();

/**
 *
 * This section checks for a PRIVATE_KEY value in the .env file
 * If no value is found it will throw the error
 */

const PRIVATE_KEY: string | undefined = (process.env.PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Found");
}

const config: HardhatUserConfig = {
    defaultNetwork: "chaos",
    solidity: "0.8.19",
    namedAccounts: {
        deployer: 0
    },
    networks: {
        chaos: {
            accounts: [PRIVATE_KEY],
            url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix"
        }
    }
};

export default config;
