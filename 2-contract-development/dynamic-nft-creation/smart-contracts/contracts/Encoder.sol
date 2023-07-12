// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

library Encoder {

    using Strings for uint256;

    function encodeSVG(string memory _svg) internal pure returns (string memory) {
        return string(abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(abi.encodePacked(_svg))
        ));
    }

    function encodeNFTMetadata(string memory name, string memory description, string memory image) internal pure returns (string memory) {

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '{',
                            '"name": "', name, '", ',
                            '"description":"', description, '", ',
                            '"image": "', image, '"',
                        '}'
                    )
                )
            )
        ));
    }
}
