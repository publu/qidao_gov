const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const FeeDistributor = await hre.ethers.getContractFactory("VotingEscrow");
    const feeDistributor = await FeeDistributor.deploy();

    await feeDistributor.deployed();

    console.log("Voting Escrow deployed to:", feeDistributor.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
