// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Escrow {
    //1st variables at the top
    //buyer is us, the artists who receibe the money
    // seller is ethglobal, who send the money
    // 1.VARIABLES
    enum State { NOT_INITIATED, AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    
    State public currState;
    
    bool public isBuyerIn;
    bool public isSellerIn;
    
    uint public price;
    
    //keep track of two addresses
    address public buyer;// this address wont be payable in all cases
    address payable public seller;
    
    
    // 2.MODIFIERS
    modifier onlyBuyer(){// only buyer can call this function
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }
    
    
    // make shure escrow hasnt started yet
    modifier escrowNotStarted (){
        require(currState == State.NOT_INITIATED);
        _;
    }
    
    
    // 3.FUNCTIONS
    constructor(address _buyer, address payable _seller, uint _price){
        buyer = _buyer;
        seller = _seller;
        price = _price * (1 ether);// make shure the price will be always mensure as 1 ether and not wei
    }
    
    
    function initContract() escrowNotStarted public {
        if(msg.sender == buyer){
            isBuyerIn = true;
        }
        if(msg.sender == seller){
            isSellerIn = true;
        }
        if(isBuyerIn && isSellerIn) {
            currState = State.AWAITING_PAYMENT;
        }
    }
    
    function deposit() onlyBuyer public payable {//buyer send funds through this function
        require(currState ==State.AWAITING_PAYMENT , "Already paid");// make sure is awaintg payment if not, its already paid
        require(msg.value == price, "wrong deposit amount");   // make sure the value that the user is sending trhough this is equal to the price.( Price is called on the constructor function)
        currState = State.AWAITING_DELIVERY; //when this is done we change the state
    }
    
    function confirmDelivery() onlyBuyer payable public { // when its called will transfer the funds to the seller
        require(currState == State.AWAITING_DELIVERY, "cannot confirm delivery");        
        seller.transfer(price);
        currState = State.COMPLETE;// its done!
    }
    
    function withdraw() onlyBuyer payable public { // if delivery never came can call this function
    require(currState == State.AWAITING_DELIVERY, "Cannot withdraw at this stage");
    payable(msg.sender).transfer(price);
    currState = State.COMPLETE;
        
    }
    
}