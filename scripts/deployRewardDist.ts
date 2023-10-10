const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const RewardDistributor = await hre.ethers.getContractFactory("RewardDistributor");
    const rewardDistributor = await RewardDistributor.deploy();

    await rewardDistributor.deployed();

    console.log("RewardDistributor deployed to:", rewardDistributor.address);

    const votingEscrowAddress = "0x12345";
    const startTime = "1000000000"
    const admin = "0x67890";

    await rewardDistributor.initialize(votingEscrowAddress, startTime, admin);
    console.log("RewardDistributor initialized");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
