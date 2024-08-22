# Ceres-zadatak

## MyNft Smart Contract

This repository contains the `MyNft` smart contract, which allows users to mint NFTs, and register addresses. The project is developed using Solidity and tested with Foundry.

## Features

- **NFT Minting**: Users can mint new NFTs by paying a fee.
- **User Registration**: Addresses can be registered to interact with the contract.
- **Blacklist Management**: The contract supports blacklisting of addresses.

## Contract Structure

- `MyNft.sol`: The main contract that handles NFT minting, user registration, and blacklist management.
- `DeployMyNft.s.sol`: A deployment script for deploying the `MyNft` contract.

## Deployment

To deploy the `MyNft` contract:

1. Install dependencies using Foundry:

   ```bash
   forge install
   ```

2. Run the deployment script:
   ```bash
   forge script script/DeployMyNft.s.sol:DeployMyNft --rpc-url YOUR-RPC-URL --private-key YOUR-PRIVATE-KEY --broadcast --verify --etherscan-api-key YOUR-ETHERSCAN-API -vvvv
   ```

## Testing

The project includes unit tests:

- **Unit Tests**: Validate core functionalities of the contract.

### Running Tests

To run the tests:

```bash
forge test
```

![Screenshot 2024-08-18 115827](https://github.com/user-attachments/assets/7163a87b-d16c-40cf-a192-8247a5b039b3)

# NestJS Backend Server

This is a NestJS backend server that serves as the core of a dApp, handling events and NFT data and providing authentication required for user blacklisting. It listens for contract events, updates the database accordingly, and uses WebSockets to trigger frontend updates.

## Prerequisites

- Node.js
- NPM 
- MongoDB 
- Web3 Provider (Alchemy)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the backend directory:

   ```bash
   cd Backend   
   ```

2. Install the dependencies:

    ```bash
    npm install
    ```
    
3. Ensure MongoDB is running and accessible.

## Features

- **Get All Events**: Fetch all events emitted by the smart contract.
- **Get All NFTs**: Retrieve all minted NFTs and their metadata.
- **Protected Route for Blacklisting**: Only the contract owner can blacklist users, verified via `verifyMessage` using the `viem` function.
- **WebSocket Integration**: Listens for smart contract events and triggers WebSocket events to notify the frontend to reload data.

## Running the Server

To start the server in development mode, run:

```bash
npm run start:dev
```

# React Frontend dApp

The frontend is built with React. It interacts with a smart contract using `wagmi` and `viem` for wallet connections and blockchain interactions. The app consists of multiple pages that allow users to connect their wallet, register, view blacklisted users, see their NFTs, and view events.

## Features

- **Connect Page**: Allows users to connect their wallet to the dApp.
- **Register Page**: Enables users to register their wallet address with the dApp.
- **Blacklisted Page**: Displays a list of blacklisted users.
- **NFT Page**: Shows all NFTs owned by the connected wallet.
- **Events Page**: Lists all relevant events emitted by the smart contract.

## Prerequisites

- NPM 
- A Web3 wallet (MetaMask)
- Web3 Provider (Alchemy)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the frontend directory:

    ```bash
    cd Backend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the App

To start the development server, run:

```bash
npm run dev
