// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyNft
 * @notice This contract is used to mint nfts.
 */
contract MyNft is ERC721, Ownable {
    // Error definitions
    error UserIsBlackListed(address caller);
    error UserIsNotRegistered(address caller);
    error NotEnoughFundsSent(uint256 funds);
    error UserAlreadyRegistered(address caller);
    error UserAlreadyBlackListed(address caller);

    // Constants
    uint256 private constant MINITING_AND_REGISTRATION_FEE = 1e14;

    // State variables
    uint256 private s_tokenCounter;
    mapping(address => bool) private s_registered;
    mapping(address => bool) private s_blackList;
    mapping(uint256 => bytes32) private s_tokenIdToUri;

    // Events
    event UserRegistered(address user);
    event UserBlackListed(address user);
    event NftMinted(bytes32 tokenUri, address recipient);

    /**
     * @dev Modifier that checks if the caller is not blacklisted.
     */
    modifier NotBlackListed() {
        if (s_blackList[msg.sender]) {
            revert UserIsBlackListed(msg.sender);
        }
        _;
    }

    /**
     * @dev Modifier that checks if the caller is registered.
     */
    modifier Registered() {
        if (!s_registered[msg.sender]) {
            revert UserIsNotRegistered(msg.sender);
        }
        _;
    }

    /**
     * @dev Modifier that checks if the sender has sent enough funds.
     */
    modifier EnoughFunds() {
        if (msg.value != MINITING_AND_REGISTRATION_FEE) {
            revert NotEnoughFundsSent(msg.value);
        }
        _;
    }

    /**
     * @dev Modifier that checks if the caller is already registered.
     */
    modifier NotRegistered() {
        if (s_registered[msg.sender]) {
            revert UserAlreadyRegistered(msg.sender);
        }
        _;
    }

    /**
     * @dev Modifier that checks if the caller is already blacklisted.
     */
    modifier NotBlacklistedAgain(address user) {
        if (s_blackList[user]) {
            revert UserAlreadyBlackListed(user);
        }
        _;
    }

    /**
     * @dev Constructor that initializes the contract with a name and symbol for the NFT collection.
     */
    constructor() ERC721("Ceres Collection", "CCOL") Ownable(msg.sender) {}

    /**
     * @dev Allows a user to mint a new NFT.
     * @param recipient The address to receive the minted NFT.
     * @param tokenUri The URI associated with the newly minted NFT.
     * @notice The caller must not be blacklisted, must be registered, and must send the exact minting fee.
     * @dev The `s_tokenCounter` is incremented using an unchecked block to save gas, as it will not exceed its limit.
     * @dev Emits an {NftMinted} event upon successful minting.
     */
    function mintNft(
        address recipient,
        bytes32 tokenUri
    ) external payable NotBlackListed Registered EnoughFunds {
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(recipient, s_tokenCounter);

        unchecked {
            s_tokenCounter++;
        }

        emit NftMinted(tokenUri, recipient);
    }

    /**
     * @dev Allows a user to register with the contract by paying the registration fee.
     * @param user The address of the user to register.
     * @notice The caller must not be blacklisted and must send the exact registration fee.
     * @dev Emits a {UserRegistered} event upon successful registration.
     */
    function register(
        address user
    ) external payable NotBlackListed EnoughFunds NotRegistered {
        s_registered[user] = true;
        emit UserRegistered(user);
    }

    /**
     * @dev Blacklists a user by address, preventing them from interacting with certain functions.
     * @param user The address of the user to blacklist.
     * @notice This function can only be called by the contract owner.
     * @dev Emits a {UserBlackListed} event upon successful blacklisting.
     */
    function blacklist(
        address user
    ) external onlyOwner NotBlacklistedAgain(user) {
        s_blackList[user] = true;
        emit UserBlackListed(user);
    }

    /**
     * @dev Checks if an address is blacklisted.
     * @param user The address to check.
     * @return True if the address is blacklisted otherwise false.
     */
    function isAddressBlackListed(address user) external view returns (bool) {
        return s_blackList[user];
    }

    /**
     * @dev Checks if a address is registered.
     * @param user The address to check.
     * @return True if the address is registered otherwise false.
     */
    function isRegistered(address user) external view returns (bool) {
        return s_registered[user];
    }

    /**
     * @dev Returns the URI associated with a given token ID.
     * @param tokenId The ID of the token whose URI is being queried.
     * @return The URI of the token.
     */
    function getTokenUri(uint256 tokenId) public view returns (bytes32) {
        return s_tokenIdToUri[tokenId];
    }
}
