module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const tokenAddress = "0x39eB558131E5eBeb9f76a6cbf6898f6E6DCe5e4E"; // QiDAO Governance Pool
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