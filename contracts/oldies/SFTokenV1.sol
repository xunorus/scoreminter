// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MShares is ERC1155, Ownable {
    uint256 public constant VINYLS = 0;
    uint256 public constant SINGLES = 1;



// this contructor is which will mint the initial versions of these NFTs
    constructor() ERC1155("https://xunorus.gitlab.io/musicshares/api/item/{id}.json") {
        _mint(msg.sender, VINYLS, 7, "");
        _mint(msg.sender, SINGLES, 11, "");
    }

// the onlyOwner modifier makes that the mint function will only be accessible by the address that deployed the contract initially
function mint(address account, uint256 id, uint256 amount) public onlyOwner {
    _mint(account, id, amount, "");
}

 // function burn (Public)
function burn( address account, uint256 id, uint256 amount) public {
// here we asume that the owner of the token is able to burn it... (ANALIS THIS!)
// this is already implemented 
    require(msg.sender == account);// we require that the account that you are requesting to burn is actually the msg.sender, otherwise you can burn someone else token. If this TRUE...
    _burn(account, id, amount);



}


}