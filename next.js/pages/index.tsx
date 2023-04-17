import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSKALEFuel from '../hooks/useSKALEFuel';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  const { address, status, checkAndFill } = useSKALEFuel();

  return (
    <div className={styles.container}>
      <Head>
        <title>SKALE Pow sFUEL Distribution Demo</title>
        <meta
          content="Demo of sFUEL Distribution"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      

      <main className={styles.main}>

        <h1 className={styles.title}>sFUEL Distribution Demo</h1>
        <div className={styles.connectButton}>
          <ConnectButton label="Connect Wallet" />
        </div>
        <div className={styles.center}>
          {status.valueOf() === "normal" && (
            <>
              <button onClick={async(e) => {
                e.preventDefault();
                if (typeof address === "string") await checkAndFill(address as string);
              }}>Fill Up</button> 
              <p>This starter application is powered by Proof of Work, a technology that comes with all SKALE Chains. If your balance is 0, you will automatically be filled up by an anoymous signer.</p>
          </>
        )}
          {status.valueOf() === "filling" && <p>Filling up {address}</p>}
          {status.valueOf() === "filled" && <p>Filled up Successfully</p>}
        </div>
        <ul className={styles.poweredBy}>
          <h3>Powered By</h3>
          <li><a href="https://rainbowkit">Rainbowkit by Rainbow</a></li>
          <li><a href="https://wagmi.sh">Wagmi by Wagmi</a></li>
          <li><a href="https://github.com/Dirt-Road-Development/pow-ethers">Proof of Work Library by Dirt Road Development</a></li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
