# Typescript Background Signers

This codebase uses the Typescript language along with the Viem library to showcase a proof of concept on how to utilize background signers
within an API or Server based environment. This can be a useful strategy when working to improve the UX of your dApp by reducing clicks.

This example also uses a sticky session per userId meaning that the randomly generated accounts are mapped 1:1 with a userId. This will persist only
for the duration of the service liftetime. On application crash or restart new wallets will be created. To resolve these types of issues you can encrypt the private keys and store them in something like Redis to make a more sophisticated service that would also allow for multiple AZ usage.

## Installation

To install run the following:

```shell
git clone -b recipe-api-background-signer git@github.com:skalenetwork/recipes.git && cd recipes
```

Add the necessary environment variables to a .env file

```shell
cp .env.example .env
```

Finally, to run the application locally run:

```shell
npm run dev
```

If no errors are thrown then you can successfully post to the following endpoints:

```shell

# Mint Function
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"userId": 123}' \
     http://localhost:4444/mint

# Burn Function
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"userId": 123}' \
     http://localhost:4444/burn

```