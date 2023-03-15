// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title MyFirstNFT
/// @author Sawyer Cutler
/// @notice This contract allows anyone to mint an ERC-721
/// @dev Explain to a developer any extra details
contract MyFirstNFT is ERC721 {

    /// @notice Represents the next tokenId to be minted or the current number
    uint256 public tokenId;

    /// @notice Is Emitted if it is the first time a user mints an NFT
    event FirstNFT(address indexed caller, uint256 indexed tokenId);

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    /// @notice Mints a new NFT
    /// @dev Can be called by anyone
    function mint() external {
        _safeMint(msg.sender, tokenId);
        if (balanceOf(msg.sender) == 1) emit FirstNFT(msg.sender, tokenId);
        tokenId++;
    }
}