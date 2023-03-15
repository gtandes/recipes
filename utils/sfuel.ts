import { AnonymousPoW } from "@skaleproject/pow-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

type Network = "calypso-staging-v3" | "chaos-staging-v3" | "europa-staging-v3" | "nebula-staging-v3" | "titan-staging-v3";

const rpcUrls: Record<Network, string> = {
    "calypso-staging-v3": "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
    "chaos-staging-v3": "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
    "europa-staging-v3": "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
    "nebula-staging-v3": "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
    "titan-staging-v3": "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
}

const faucets: Record<Network, { address: string, functionSignature: string }> = {
    "calypso-staging-v3": {
        address: "0xa9eC34461791162Cae8c312C4237C9ddd1D64336",
        functionSignature: "0x0c11dedd"
    },
    "chaos-staging-v3": {
        address: "0x2edF5af1896D3d259a1a535e87f18312858E448F",
        functionSignature: "0x0c11dedd"
    },
    "europa-staging-v3": {
        address: "0xa9eC34461791162Cae8c312C4237C9ddd1D64336",
        functionSignature: "0x0c11dedd"
    },
    "nebula-staging-v3": {
        address: "0xfd56A3456fbAB0fc013213edCc830B9d32403C8B",
        functionSignature: "0x0c11dedd"
    },
    "titan-staging-v3": {
        address: "",
        functionSignature: ""
    }
}

function _getNetwork(network: Network) {
    return rpcUrls[network];    
}

export async function retrieveSKALEFuel(network: string, deployer: string, hre: HardhatRuntimeEnvironment) {
    const pow = new AnonymousPoW({ rpcUrl:  _getNetwork(network as Network)});

    const { ethers } = hre;

    const provider = new ethers.providers.JsonRpcProvider(_getNetwork(network as Network));
    const balance = await provider.getBalance(deployer);

    if (balance < ethers.utils.parseEther("0.005")) {
        const faucet = faucets[network as Network];
        const tx = await pow.send({
            to: faucet.address,
            data: faucet.functionSignature + "000000000000000000000000" + deployer.substring(2),
            gas: 65000
        });

        const rec = await tx.wait(1)

        
    }
}