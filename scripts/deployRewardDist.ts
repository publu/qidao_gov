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

async function initializeRewardDistributor() {
    const rewardDistributor = await hre.ethers.getContractAt("RewardDistributor", "0x53371f87AD6D20A0dBfB37f04A35f4d14065C342");

    const votingEscrowAddress = "0x1bffabc6dfcafb4177046db6686e3f135e8bc732";
    const startTime = Math.floor((Date.now()+100000) / 1000).toString(); // Current time in seconds
    const admin = "0x9d3c8a651e48e4D89ca5D1553035A4BE3c17cFe6";
    console.log(votingEscrowAddress, startTime, admin)
    await rewardDistributor.initialize(votingEscrowAddress, startTime, admin);
    console.log("RewardDistributor initialized");
}

initializeRewardDistributor()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });