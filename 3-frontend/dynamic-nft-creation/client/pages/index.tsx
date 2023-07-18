import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { ApplicationHead } from '../components';
import useAppData from '../hooks';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IState {
  address: string | undefined;
  balance: number | bigint;
  tokensOwned: {
      uri: string;
      tokenId: number | bigint;
  }[]
}

const Home: NextPage = () => {

  const { address, safeMint, setup} = useAppData();

  const [state, setState] = useState<IState>({
    address: undefined,
    balance: 0,
    tokensOwned: []
});

  useEffect(() => {
    if (address) {
      setup(state, setState);
    }
  }, [address])

  const updateGallery = async() => {
    await setup(state, setState);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setup(state, setState);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <ApplicationHead />
      <main className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.title}>
            <h2>Dynamic NFT</h2>
          </div>
          <div className={styles.connectWallet}>
            <ConnectButton />
          </div>
        </nav>
        <div className={styles.gallery}>
          {state.tokensOwned && state.tokensOwned.length === 0
            ? "No Tokens Owned :("
            : (
              <div className={styles.item}>
                {state.tokensOwned && state.tokensOwned.map((token, index: number) => {
                  const json = Buffer.from(token.uri.substring(29), "base64").toString();
                  const result = JSON.parse(json);
                  return (
                    <img key={index} src={result["image"]} alt ="Hi" />
                  )
                })}
              </div>
            )
          }
        </div>
        <div className={!safeMint.isIdle ? styles.loading : styles.mint}>
          <button className={!safeMint.isIdle ? styles.animated : undefined} onClick={() => safeMint.write()} disabled={!safeMint.isIdle}>
            {!safeMint.isIdle ? <p>&#x21bb;</p> : <p>&#43;</p>}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
