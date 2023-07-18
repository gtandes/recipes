import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  skaleChaosTestnet
} from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    {
      ...skaleChaosTestnet,
      rpcUrls: {
        ...skaleChaosTestnet.rpcUrls,
        default: {
          ...skaleChaosTestnet.rpcUrls.default,
          webSocket: ["wss://staging-v3.skalenodes.com/v1/ws/staging-fast-active-bellatrix"]
        },
        public: {
          ...skaleChaosTestnet.rpcUrls.public,
          webSocket: ["wss://staging-v3.skalenodes.com/v1/ws/staging-fast-active-bellatrix"]
        }
      }
    }
  ],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '8154bfd0335d303838805dca0b05a46f',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
