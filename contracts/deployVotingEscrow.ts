module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const tokenAddress = "0xYourTokenAddressHere"; // Replace with your token's address
  const name = "Advanced Voting Escrowed QI";
  const symbol = "aveQI";
  const authorizerAdaptor = "0xYourAuthorizerAdaptorAddressHere"; // Replace with your AuthorizerAdaptor's address

  await deploy("VotingEscrow", {
    from: deployer,
    args: [tokenAddress, name, symbol, authorizerAdaptor],
    log: true,
  });
};

module.exports.tags = ["VotingEscrow"];