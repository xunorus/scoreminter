// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.8 .7;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// define the item
contract donationExample {
    
    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    event Donate(
        address from,
        uint256 amount,
        string message
    );


    function newDonation(string memory note) public payable{
        (bool success,) = owner.call{value: msg.value}("");
        require(success,"FAILED TO SEND MONEY!");
        emit Donate(
            msg.sender,
            msg.value,
            note
        );

        // emit Donate(
        //     msg.sender,
        //     msg.value / 1000000000000000000
        // );
    }

    
    
 
}