const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const RewardDistributor = await hre.ethers.getContractFactory("RewardDistributor");
    const rewardDistributor = await RewardDistributor.deploy();

    await rewardDistributor.deployed();

    console.log("RewardDistributor deployed to:", rewardDistributor.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
