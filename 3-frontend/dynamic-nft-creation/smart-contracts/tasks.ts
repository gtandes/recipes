import { task } from "hardhat/config";
import { Contract } from "ethers";

task("mint", "Mint an NFT")
    .setAction( async (_, hre) => {
    
        const { ethers, deployments, getChainId } = hre;
        
        const [ signer ] = await ethers.getSigners();
        
        const contractConfig = await deployments.get("DynamicNFT");
        const provider = new ethers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix");

        const contract = new Contract(contractConfig.address, contractConfig.abi, signer);
        
        // await contract.safeMint(signer.address);
        // const res = await contract
        let txData = {
            from: signer.address,
            to: contractConfig.address,
            data: contract.interface.encodeFunctionData(
                "safeMint",
                [signer.address]
            ),
            type: 0,
        };

        const res = await signer.sendTransaction({
            ...txData,
            chainId: await getChainId(),
            gasLimit: await provider.estimateGas(txData)
        });

        console.log("Res: ", res);
    });
