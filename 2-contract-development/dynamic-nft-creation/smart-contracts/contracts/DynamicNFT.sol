// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@dirtroad/skale-rng/contracts/RNG.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./SVG.sol";
import "./Encoder.sol";

contract DynamicNFT is RNG, ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter public tokenIdCounter;

    mapping(uint256 => string) public colors;
    mapping(uint256 => uint8[]) public speeds;

    constructor() ERC721("DynamicNFT", "DNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);

        uint8 arrSize = 6;

        uint8[] memory randomNumbers = new uint8[](arrSize);
        for (uint8 i = 0; i < arrSize; i++) {
            if (i < 3) {
                randomNumbers[i] = uint8(getNextRandomRange(i, 255));
            } else {
                randomNumbers[i] = uint8(1 + getNextRandomRange(i, 36));
            }
        }

        colors[tokenIdCounter.current()] = string(abi.encodePacked(randomNumbers[0], ",", randomNumbers[1], ",", randomNumbers[2]));
        speeds[tokenIdCounter.current()] = [randomNumbers[3], randomNumbers[4], randomNumbers[5]];
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
