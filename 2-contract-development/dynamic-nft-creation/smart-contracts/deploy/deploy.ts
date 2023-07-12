import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    /** Deploys Encoder Library Separately */
    await deploy(
        "Encoder",
        {
            from: deployer,
            log: true,
        }
    );

    /** Deploys SVG Library Separately */
    await deploy(
        "SVG",
        {
            from: deployer,
            log: true,
        }
    );

    /** Deploys DynamicNFT Contract */
    await deploy(
        "DynamicNFT",
        {
            from: deployer,
            log: true,
            libraries: {
                Encoder: (await deployments.get("Encoder")).address,
                SVG: (await deployments.get("SVG")).address
            }
        }
    );
}

export default func;

func.tags = ["default"]
