// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {DeployMyNft} from "../script/DeployMyNft.s.sol";
import {MyNft} from "../src/MyNft.sol";

contract MyNftTest is Test {
    DeployMyNft public deployer;
    MyNft public myNft;

    address public alice = address(0x9);
    address public bob = address(0xa);
    uint256 private constant MINITING_AND_REGISTRATION_FEE = 1e14;

    function setUp() public {
        deployer = new DeployMyNft();
        myNft = deployer.run();
    }

    function testNameIsCorrect() public view {
        string memory expectedName = "Ceres Collection";
        string memory actualName = myNft.name();

        assert(
            keccak256(abi.encodePacked(expectedName)) ==
                keccak256(abi.encodePacked(actualName))
        );
    }

    function testRegisterUser() public {
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);

        assertTrue(myNft.isRegistered(alice));
    }

    function testMintNft() public {
        vm.deal(alice, 1 ether);
        vm.startPrank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);

        bytes32 tokenUri = keccak256(abi.encodePacked("ipfs://Qm..."));
        myNft.mintNft{value: MINITING_AND_REGISTRATION_FEE}(alice, tokenUri);
        vm.stopPrank();

        assertEq(myNft.ownerOf(0), alice);
        assertEq(myNft.getTokenUri(0), tokenUri);
    }

    function testBlacklistUser() public {
        vm.prank(myNft.owner());
        myNft.blacklist(alice);

        assertTrue(myNft.isAddressBlackListed(alice));
    }

    function testFailMintNftWhenBlacklisted() public {
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);

        vm.prank(myNft.owner());
        myNft.blacklist(alice);

        bytes32 tokenUri = keccak256(abi.encodePacked("ipfs://Qm..."));

        vm.prank(alice);
        myNft.mintNft{value: MINITING_AND_REGISTRATION_FEE}(alice, tokenUri);
    }

    function testFailMintNftWithoutRegistering() public {
        bytes32 tokenUri = keccak256(abi.encodePacked("ipfs://Qm..."));
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        myNft.mintNft{value: MINITING_AND_REGISTRATION_FEE}(alice, tokenUri);
    }

    function testFailMintWithoutFunds() public {
        vm.deal(alice, MINITING_AND_REGISTRATION_FEE);
        vm.prank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);

        bytes32 tokenUri = keccak256(abi.encodePacked("ipfs://Qm..."));
        vm.prank(alice);
        myNft.mintNft{value: MINITING_AND_REGISTRATION_FEE}(alice, tokenUri);
    }

    function testFailRegisterWithoutFunds() public {
        vm.prank(alice);

        vm.expectRevert(MyNft.NotEnoughFundsSent.selector);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);
    }

    function testBlacklistedUserCannotRegister() public {
        vm.prank(myNft.owner());
        myNft.blacklist(alice);

        vm.deal(alice, 1 ether);
        vm.prank(alice);
        vm.expectRevert();
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);
    }

    function testFailOnlyOwnerCanBlacklist() public {
        vm.prank(alice);
        myNft.blacklist(bob);
    }

    function testUserHasEnoughFundsToRegister() public {
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);
    }

    function testFailUserAlreadyRegistered() public {
        vm.deal(alice, 1 ether);
        vm.startPrank(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);
        myNft.register{value: MINITING_AND_REGISTRATION_FEE}(alice);
        vm.stopPrank();
    }

    function testFailUserAlreadyBlacklisted() public {
        vm.startPrank(myNft.owner());
        myNft.blacklist(alice);
        myNft.blacklist(alice);
        vm.stopPrank();
    }
}
