const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Replace these values with the appropriate ones for your setup
    const VOTING_ESCROW_ADDRESS = "0xYourVotingEscrowAddressHere";
    const START_TIME = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const FeeDistributor = await hre.ethers.getContractFactory("FeeDistributor");
    const feeDistributor = await FeeDistributor.deploy(VOTING_ESCROW_ADDRESS, START_TIME);

    await feeDistributor.deployed();

    console.log("FeeDistributor deployed to:", feeDistributor.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
