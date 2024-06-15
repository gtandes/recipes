const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  apps: [
    {
      name: "SFUEL_distributor_calypso",
      script: "./src/index.ts",
      watch: true,
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      max_memory_restart: "1G",
      interpreter: "ts-node",
      env: {
        PORT: 8889,
        RPC_URL: "https://testnet.skalenodes.com/v1/giant-half-dual-testnet",
        PRIVATE_KEY: PRIVATE_KEY,
        CHAIN_ID: "974399131",
        CHAIN_NAME: "CalypsoTestnet",
      },
    },

    {
      name: "SFUEL_distributor_europa",
      script: "./src/index.ts",
      watch: true,
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      max_memory_restart: "1G",
      interpreter: "ts-node",
      env: {
        PORT: 8890,
        RPC_URL: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
        PRIVATE_KEY: PRIVATE_KEY,
        CHAIN_ID: "1444673419",
        CHAIN_NAME: "EuropaTestnet",
      },
    },

    {
      name: "SFUEL_distributor_nebula",
      script: "./src/index.ts",
      watch: true,
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      max_memory_restart: "1G",
      interpreter: "ts-node",
      env: {
        PORT: 8891,
        RPC_URL: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
        PRIVATE_KEY: PRIVATE_KEY,
        CHAIN_ID: "37084624",
        CHAIN_NAME: "NebulaTestnet",
      },
    },

    {
      name: "SFUEL_distributor_titan",
      script: "./src/index.ts",
      watch: true,
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      max_memory_restart: "1G",
      interpreter: "ts-node",
      env: {
        PORT: 8892,
        RPC_URL: "https://testnet.skalenodes.com/v1/aware-fake-trim-testnet",
        PRIVATE_KEY: PRIVATE_KEY,
        CHAIN_ID: "1020352220",
        CHAIN_NAME: "TitanTestnet",
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: "SSH_USERNAME",
  //     host: "SSH_HOSTMACHINE",
  //     key: "deploy.key",
  //     ref: "origin/master",
  //     repo: "GIT_REPOSITORY",
  //     path: "DESTINATION_PATH",
  //     "pre-deploy-local": "",
  //     "post-deploy":
  //       "npm install && pm2 reload ecosystem.config.js --env production",
  //     "pre-setup": "",
  //     env: {
  //       NODE_ENV: "production",
  //       DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
  //     },
  //   },
  // },
};
