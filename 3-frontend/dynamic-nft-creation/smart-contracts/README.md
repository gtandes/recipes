# Dynamic NFT Contracts

This is the second part of the recipe for creating dynamic on-chain NFTs.
To interact with this codebase see the commands below.

## Setup

First install the necessary dependencies by running:

```shell
npm install
```

After installing the necessary dependencies, add a private key to the .env file.
Make sure not to commit this file to source control. Additionally, this account will need sFUEL to interact with the chain regardless of the SKALE Chain. 

sFUEL can be attained at https://sfuel.skale.network/staging/chaos for the Chaos Testnet SKALE Chain.
For usage on other SKALE chains, make sure that you have been provided with Deployer Role in order to successfully deploy the smart contracts. If you do not have the proper role you will see an error that says: Out of Gas.

### Commands

#### Deploy
```shell
npx hardhat deploy
```

#### Mint
```shell
npx hardhat mint
```
