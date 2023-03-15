import { HardhatUserConfig } from "hardhat/config";
import fs from "fs";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";                    /// Allows for npx hardhat deploy
import "hardhat-deploy-ethers";             /// Allows for npx hardhat deploy with ethers
import "hardhat-contract-sizer";            /// Script allows for checking contract sizes
import "./tasks/mint";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

let privateKey = process.env.PRIVATE_KEY;

if (!privateKey || privateKey.length === 0) {
    privateKey = ethers.Wallet.createRandom().privateKey.substring(2)
    fs.writeFileSync(".env", `PRIVATE_KEY=${privateKey}`, "utf-8");
    console.log("Private Key Created");
}

const API_KEY = "any-key-will-work" as const;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  namedAccounts: {
    deployer: 0
  },
  defaultNetwork: "chaos-staging-v3",
  networks: {
    "calypso-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
      accounts: [privateKey]
    },
    "chaos-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
      accounts: [privateKey]
    },
    "europa-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
      accounts: [privateKey]
    },
    "nebula-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
      accounts: [privateKey]
    },
    "titan-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
      accounts: [privateKey]
    },    
  },
  etherscan: {
    apiKey: {
      "calypso-staging-v3": API_KEY,
      "chaos-staging-v3": API_KEY,
      "europa-staging-v3": API_KEY,
      "nebula-staging-v3": API_KEY,
      "titan-staging-v3": API_KEY
    },
    customChains: [
      {
        network: "calypso-staging-v3",
        chainId: 344106930,
        urls: {
          apiURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com"
        }
      },
      {
        network: "chaos-staging-v3",
        chainId: 1351057110,
        urls: {
          apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com"
        }
      },
      {
        network: "europa-staging-v3",
        chainId: 476158412,
        urls: {
          apiURL: "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com"
        }
      },
      {
        network: "nebula-staging-v3",
        chainId: 503129905,
        urls: {
          apiURL: "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com"
        }
      },
      {
        network: "titan-staging-v3",
        chainId: 1517929550,
        urls: {
          apiURL: "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com"
        }
      },
    ]
  }
};

export default config;
