//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheodoUpNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TheodoUpNft", "THD") {}

    function awardUp(address awardedTheodoer, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newUpId = _tokenIds.current();
        _mint(awardedTheodoer, newUpId);
        _setTokenURI(newUpId, tokenURI);

        _tokenIds.increment();
        return newUpId;
    }
}
