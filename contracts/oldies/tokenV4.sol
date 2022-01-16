// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicsharesTokenV4 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () ERC721("MSharesTokenV4", "MSHARESv4"){}

    struct Item {
        uint256 tokenId;
        address creator;
        string uri;
    }

    mapping (uint256 => Item) public Items;

    event distroMinted(uint256 tokenId,  address creator, string uri ); 

    function createItem(string memory uri) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        Items[newItemId] = Item(newItemId, msg.sender, uri);

        emit distroMinted( newItemId, msg.sender, uri );

        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
       return Items[tokenId].uri;
    }
}