# Voting Escrow Contracts

This repository contains Solidity smart contracts that implement a voting escrow system as well as a fee distribution system. The contracts enable users to lock their tokens for a specified period of time and participate in voting with time-weighted votes. The voting power of users decays linearly over time, incentivizing long-term commitment to the voting process.

## Background

The voting escrow contracts were developed in the context of a snapshot vote conducted by QiDao. By implementing a voting escrow system, QiDao aims to encourage long-term commitment and provide a fair voting mechanism that takes into account the duration of users' token locks and provide a proper incentive structure for lockers and users of the protocol.

## Contracts

The repository includes the following contracts:

- `VotingEscrow.sol`: This contract implements the core functionality of the voting escrow system. It allows users to deposit tokens, lock them for a specified period, increase the lock amount, extend the lock duration, and withdraw tokens after the lock expires. The contract also provides methods for calculating voting power and total supply at specific points in time.

- `FeeDistributor.sol`: This contract is responsible for distributing fees collected. It receives fees from various sources and distributes them to the designated recipients based on predefined rules. The FeeDistributor contract can interact with the VotingEscrow contract to determine the voting power of users and allocate fees accordingly.

## Usage

To use the voting escrow contracts, you need to deploy the `VotingEscrow` and `FeeDistributor` contracts to the Polygon network. The `VotingEscrow` contract requires the deployment address of an ERC20 token contract as a constructor parameter. Once deployed, users can interact with the contract to deposit, lock, increase, and withdraw their tokens.

The `FeeDistributor` contract should be deployed separately and configured to receive fees. The contract will distribute the collected fees to the designated recipients based on the voting power of users. It can utilize the `VotingEscrow` contract to calculate voting power accurately.

## Development

If you want to contribute to the development of the voting escrow contracts or run tests locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the required dependencies: `npm install`
3. Modify the contracts or write new tests in the `test` directory.
4. Run the tests: `npm run test`

## License

The voting escrow contracts are released under the [MIT License](LICENSE). You can use, modify, and distribute the code freely.

## Credits

The voting escrow contracts were developed by Curve Finance. For more information about Curve Finance and their governance processes, visit their official website and documentation.
