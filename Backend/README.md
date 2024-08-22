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
