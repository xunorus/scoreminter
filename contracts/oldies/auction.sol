// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.8.0;

contract Auction  {
    uint public auctionEndTime;
    address payable public artistA;
    address payable public artistB;
    address public highestBidder;
    uint public highestBid;
    
    mapping(address => uint) public pendingReturns;
    
    bool ended = false;
    
    event HighestBidIncrease(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);
    
    constructor(uint _biddingTime, address payable _artistA, address payable _artistB){
         artistA = _artistA;
         artistB = _artistB;
        auctionEndTime = block.timestamp + _biddingTime;
    }
    
    function bid()public payable{
        if(block.timestamp > auctionEndTime){
            revert("La SUBASTA YA HA TERMINADO");
        }
        if(msg.value <= highestBid){
            revert("YA HAY UNA APUESTA IGUAL O SUPERIOR!");
        }
        if(highestBid != 0){
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncrease(msg.sender, msg.value);
    }
    
    function widthdraw() public returns(bool){
        uint amount = pendingReturns[msg.sender];
        if(amount > 0){
            pendingReturns[msg.sender] = 0;
            
            if(!payable(msg.sender).send(amount)){
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
          return true;

    }
    
    function auctionEnd() public {
        if(block.timestamp < auctionEndTime){
            revert("LA SUBASTA TODAVIA NO HA TERMINADO");
        }
        
        if(ended){
            revert("THE FUNCTION AuctionEnded HAS ALREADY BEEN CALLED");
        }
        
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        
        uint splitedPrize = highestBid/2;

        artistA.transfer(splitedPrize);
        artistB.transfer(splitedPrize);
    }
    
}

