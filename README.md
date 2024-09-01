# UserProfile DApp

A simple decentralized application (DApp) that allows users to manage their profiles on the Ethereum blockchain. Users can set, update, and view profiles containing their name, age, and email.

## Smart Contract Overview

The `UserProfile` smart contract provides functionalities to:
- Set or update a user profile.
- Retrieve a user's profile.
- Delete a user's profile (admin only).

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed.
- MetaMask browser extension installed and configured.
- An Ethereum wallet with testnet ETH for gas fees.
- Access to an Ethereum testnet (like Rinkeby or Goerli).

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/UserProfile-DApp.git
    cd UserProfile-DApp
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Deploying the Smart Contract

1. **Compile and Deploy the Smart Contract using Remix:**
   - Go to [Remix IDE](https://remix.ethereum.org/).
   - Create a new file named `UserProfile.sol` and copy the smart contract code into it.
   - Compile the contract.
   - Deploy it on a testnet using MetaMask.

2. **Update the Contract Address and ABI in your React app:**
   - Replace `contractAddress` in `HomePage.js` with the deployed contract address.
   - Make sure the ABI matches the compiled contract ABI.

## Running the DApp

1. **Start the development server:**
    ```bash
    npm start
    ```
2. **Open the app in your browser:**
   - The app will run on `http://localhost:3000`.

## Usage

- **Connect Wallet:** Use the "Connect MetaMask Wallet" button to connect your MetaMask wallet.
- **Set Profile:** Enter your name, age, and email, then click "Register" to save your profile on the blockchain.
- **View Profile:** Enter an Ethereum address to view the associated profile details.

## Project Structure

- **Smart Contracts:** Located in the `contracts` folder, specifically `UserProfile.sol`.
- **Frontend:** React code for interacting with the smart contract is in `HomePage.js`.

## Technologies Used

- **Solidity:** Smart contract language for the Ethereum blockchain.
- **JavaScript (React):** Frontend framework for building the user interface.
- **Ethers.js:** Library for interacting with Ethereum.
- **MetaMask:** Ethereum wallet for connecting to the blockchain.

## Author

Favour Sabo

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
