const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    // Mint 1 million ETH to the deployer
    const mintAmount = ethers.utils.parseEther("100000000");
    await ethers.provider.send("hardhat_setBalance", [
        deployer.address,
        mintAmount.toHexString(),
    ]);
    console.log(`Minted ${ethers.utils.formatEther(mintAmount)} ETH to deployer`);

    // Check the ETH balance of the deployer
    const deployerBalance = await ethers.provider.getBalance(deployer.address);
    console.log(`Deployer ETH balance: ${ethers.utils.formatEther(deployerBalance)} ETH`);

    const locker = {
        address: "0x044325aCCB1A131cD00B4Cef674E9a8d9b60ad72" // someone with lots of Qi/ETH in ve
    }
    
    const rewardToken = {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // someone with lots of Qi/ETH in ve
    }

    const votingEscrowAddress = "0x1bffabc6dfcafb4177046db6686e3f135e8bc732";

    // Call checkpoint on VotingEscrowGamma contract
    const VotingEscrowGamma = await ethers.getContractAt("VotingEscrowGamma", votingEscrowAddress);
    await VotingEscrowGamma.checkpoint();
    
    // Deploy the RewardDistributor contract with initializer
    const RewardDistributorFactory = await ethers.getContractFactory("RewardDistributor");
    const RewardDistributor = await RewardDistributorFactory.deploy();
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    const startTime = Math.floor(Date.now() / 1000) + oneWeekInSeconds;
    await RewardDistributor.initialize(votingEscrowAddress, startTime, deployer.address);

    await RewardDistributor.deployed();

    const rewardDistributorAddress = RewardDistributor.address;
    console.log(`RewardDistributor deployed to: ${rewardDistributorAddress}`);
    
    // Add WETH as an allowed reward token
    await RewardDistributor.addAllowedRewardTokens([rewardToken.address]);
    console.log(`Added WETH at address ${rewardToken.address} as an allowed reward token`);
    
    console.log("Using locker account:", locker.address);


    // Increase time by 1 week
    await ethers.provider.send("evm_increaseTime", [oneWeekInSeconds]);
    await ethers.provider.send("evm_mine");
    console.log("Time increased by 1 week");
    const IERC20 = await ethers.getContractAt("WETH9", rewardToken.address); // Replace with actual token address

    // Wrap ETH to get WETH
    const weth = IERC20.attach(rewardToken.address); // WETH token address
    const ethAmount = ethers.utils.parseEther("10000"); // Amount of ETH to wrap
    await weth.deposit({ value: ethAmount });
    console.log(`Wrapped ${ethers.utils.formatEther(ethAmount)} ETH to WETH`);

    // Deposit a large amount of tokens in the contract
    await IERC20.connect(deployer).approve(RewardDistributor.address, ethAmount);
    console.log("Approved the tokens to RewardDistributor");
    const depositAmount = ethers.utils.parseEther("100"); // Amount of ETH to wrap

    console.log("Depositing tokens to RewardDistributor");
    await RewardDistributor.depositToken(rewardToken.address, depositAmount);
    console.log(`Deposited ${ethers.utils.formatEther(depositAmount)} tokens to RewardDistributor`);
    
    console.log("Increasing time by 2 weeks");
    await ethers.provider.send("evm_increaseTime", [3 * 7 * 24 * 60 * 60]); // 2 weeks in seconds
    await ethers.provider.send("evm_mine");
    console.log("Time increased by 2 weeks");

    // Impersonate the locker and attempt to claim the token
    await ethers.provider.send("hardhat_impersonateAccount", [locker.address]);
    const impersonatedLocker = await ethers.getSigner(locker.address);
    // Send ETH to impersonatedLocker to pay for transactions
    await deployer.sendTransaction({ to: impersonatedLocker.address, value: ethers.utils.parseEther("1") });
    console.log(`Sent 1 ETH to ${impersonatedLocker.address} for transaction fees`);
    const claimedAmount = await RewardDistributor.connect(impersonatedLocker).claimToken(locker.address, rewardToken.address);
    console.log(`Claimed amount: ${ethers.utils.formatEther(claimedAmount)} tokens`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });