// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.8 .7;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

// usage
// const nft = await NFT.deploy(["0xExample", "0xExample2"], [60, 40]);

// define the item
contract donationExample {
    
    address payable payes;

 
  
 constructor (address[] memory payees, uint256[] memory shares)
    PaymentSplitter(_payees, _shares)
    public payable{
          payees = _payees;
        shares = _shares;
    }

    event Donate(
        address from,
        uint256 amount
    );


    function newDonation() public payable{
        (bool success,) = payes.call{value: msg.value}("");
        require(success,"FAILED TO SEND MONEY!");

        emit Donate(msg.sender,msg.value / 1000000000000000000 );
    }

    
    
 
}