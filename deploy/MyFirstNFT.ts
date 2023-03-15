import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { retrieveSKALEFuel } from "../utils/sfuel";
import { MyFirstNFT } from "../config";

const deployFunction: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    
    if (!hre.network) throw new Error("Network Not Found");
    const ret = await retrieveSKALEFuel(hre.network.name, deployer, hre);

    await deploy(
        "MyFirstNFT",
        {
            from: deployer,
            log: true,
            args: [
                MyFirstNFT.name,
                MyFirstNFT.symbol,
            ]
        }
    );
}

export default deployFunction;

deployFunction.tags = ["NFT", "MyFirstNFT"];