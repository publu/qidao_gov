import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-vyper";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  solidity: {
    compilers: [
      { version: "0.8.17" },
      { version: "0.7.1" },
    ],
  },
  vyper: {
    version: "0.3.1",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-rpc.com", // RPC URL for Polygon Mainnet
      },
    },
  },
};

export default config;
