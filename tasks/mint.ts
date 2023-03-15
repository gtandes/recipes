import { ethers } from "ethers";
import { task } from "hardhat/config";
import { retrieveSKALEFuel } from "../utils/sfuel";

task("mint", "Mints an NFT")
    .setAction(async (taskArguments, hre) => {
        const artifact = await hre.deployments.get("MyFirstNFT");
        const [ signer ] = await hre.ethers.getSigners();
        const contract = new hre.ethers.Contract(artifact.address, artifact.abi, signer);

        if ((await signer.getBalance()) < ethers.utils.parseEther("0.0005")) {
            const getSFUEL = await retrieveSKALEFuel(hre.network.name, (await signer.getAddress()), hre);
        }

        await contract.mint();
        
        console.log("NFT minted Successfully");
    });
