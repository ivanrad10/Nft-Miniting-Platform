// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {MyNft} from "../src/MyNft.sol";

/**
 * @title DeployMyNft
 * @notice This contract is used to deploy the MyNft contract. It extends the Script contract from Forge's standard library.
 */
contract DeployMyNft is Script {
    /**
     * @notice Deploys a new instance of the MyNft contract.
     * @dev This function starts broadcasting, deploys the MyNft contract, and then stops broadcasting.
     * @return myNft The address of the newly deployed MyNft contract.
     */
    function run() external returns (MyNft) {
        vm.startBroadcast();
        MyNft myNft = new MyNft();
        vm.stopBroadcast();
        return myNft;
    }
}
