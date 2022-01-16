// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract Cryptomurals is ERC1155, Ownable, ERC1155Burnable {

    uint256 public constant CMURALS0 = 0;//ID
    uint256 public constant CMURALS1 = 1;
    uint256 public constant CMURALS2 = 2;
    uint256 public constant CMURALS3 = 3;
    uint256 public constant CMURALS4 = 4;
    uint256 public constant CMURALS5 = 5;
    uint256 public constant CMURALS6 = 6;
    uint256 public constant CMURALS7 = 7;



// this contructor is which will mint the initial versions of these NFTs
    constructor() ERC1155("https://hyorvrgxcdmm.usemoralis.com/{id}.json") {
        _mint(msg.sender, CMURALS1, 21, "");// amount
        _mint(msg.sender, CMURALS2, 2, "");
        _mint(msg.sender, CMURALS3, 3, "");
        _mint(msg.sender, CMURALS4, 4, "");
        _mint(msg.sender, CMURALS5, 5, "");
        _mint(msg.sender, CMURALS6, 6, "");
        _mint(msg.sender, CMURALS7, 7, "");
    }

// the onlyOwner modifier makes that the mint function will only be accessible by the address that deployed the contract initially
function mint(address account, uint256 id, uint256 amount) 
    public 
    onlyOwner
{
    // onlyOwner means that this function can only be executed by the creator of the contract
    _mint(account, id, amount, "");
}

function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    public
    onlyOwner
{
    _mintBatch(to, ids, amounts, data);
}
 // function burn (Public)
 // only token owner can burn the token
function burn( address account, uint256 id, uint256 amount) 
    public 
{
// here we asume that the owner of the token is able to burn it... (ANALIS THIS!)
// this is already implemented 
    require(msg.sender == account);// we require that the account that you are requesting to burn is actually the msg.sender, otherwise you can burn someone else token. If this TRUE...
    _burn(account, id, amount);
}


}