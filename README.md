# Hello SKALE

This branch and recipe represnets the code used in the recipe found [in the docs](https://docs.skale.network/recipes/solidity/0-hello-skale).

Checkout the [code](./contracts/HelloSKALE.sol).

## Installation

Clone this branch by calling the following:

### Using HTTP (Default)

```shell
git clone -b recipe-hello-skale https://github.com:skalenetwork/recipes.git &&
cd recipes &&
touch .env &&
npm install
```

### Using SSH
```shell
git clone -b recipe-hello-skale git@github.com:skalenetwork/recipes.git &&
cd recipes &&
touch .env &&
npm install
```

## Deployment

Ready to deploy? Run the following in your command prompt:

```shell
npx hardhat deploy
```

Congratulations! HelloSKALE will now be deployed on the SKALE Chaos Testnet.

### Notes
1. If you deploy with manually adding a .env file and a private key, one will be created for you
2. If you deploy on a network and don't have sFUEL, sFUEL will be provided to your wallet using an on-chain faucet
