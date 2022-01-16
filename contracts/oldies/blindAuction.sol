// SPDX-License-Identifier: GPL-3.0
// pragma solidity ^ 0.8.0;
pragma solidity >=0.7.0 <0.9.0;
contract BlindAuction{

// Noone knwos how much others are biding in this auciton
// bidder does not actually send their bid, but only a hashed version of int256
// bidder commits to the bid with their hashed
// since value cannot be blind in ethereum
// only accept any value larger than the largest bid
// this can only checked during the reveal phase
// some of them wil be invalid...
// the bid doesnt really happend until the end of the auction, because if we do transfer before that this will be publicly available information

// VARIABLES
struct Bid {
    bytes32 blindedBid; // when we call generateBlindedBidBytes32 function, whatever returns from it will be the value that will be saved here
    uint deposit;
}

address payable public beneficiary; // address that will receibe the winning bid
uint public biddingEnd;
uint public revealEnd;
bool public ended;// as soon as it finishes will be turned to true

mapping(address => Bid[]) public bids;

// keep track of the current state of the aucion
//declare the address of  the highest bidder
address public highestBidder;
uint public highestBid;

//finally, one more maping, this will allow users to withdraw previous bid
// mapping(address => unit) pendingReturns;
    mapping(address => uint) pendingReturns;

//this cannot be public

// EVENTS
//one simpel event, tell and log into the blockchain that the auction ended, and record the addres of the winner
event AuctionEnded(address winner, uint highestBid);

//MODIFIERS
//two modifiers.
//make shure its after this time
modifier onlyBefore(uint _time) { require(block.timestamp < _time); _; }
modifier onlyAfter(uint _time) { require(block.timestamp > _time); _;} //greater that that the time that is passed





// FUNCTIONS
// 3 arguments passed when we deploy our contract
constructor(
    uint _biddingTime,// how long we want the bidding to be available. If we put 60 seconds, the bidding will be available for 60 secs
    uint _revealTime,// if we also add 60 secs, the reveal end will be 60 secs on top of the bidding end
    address payable _beneficiary
    ){
    // when you deploy the contract this constructor is  called.
    
    beneficiary = _beneficiary;
    biddingEnd = block.timestamp + _biddingTime;
    revealEnd = biddingEnd + _revealTime;
    
}


    // byetes32 is hash. we use these values to produce a hash, and they will be returned to us with this object
    //false for the transaction bid to be considered true bid, true means yes it is fake, false means it is not fake
    // use some encryption to make sure we record the value and make shure is a hashed value
    // the value will be recorded as a hash
    // it returns bytes 32 object.
    // bytes 32 are a result of a hash
    function generateBlindedBidBytes32( uint value, bool fake) public view returns (bytes32){
        return keccak256(abi.encodePacked(value, fake));// wherever values we pass here will be combined into one hash
    
    }

    //record our bids
    //allows us to store the hash value inside of our mapping!!!
    function bid(bytes32 _blindedBid) public payable onlyBefore(biddingEnd) { // can only be done before the  end of the bidding hand 
        //two things.
        //take a hash value generated in  generateBlindedBidBytes32
    //whoever is placing the bid, we push it at the end of the list address
    bids[msg.sender].push(Bid({
        blindedBid: _blindedBid,//our hash
        deposit: msg.value
    }));

    }
    
    //reveal all of the bid and the highes bid
    //controls , called only after the bidding period is done. 
    function reveal(
        uint[] memory _values,// list of values
        bool[] memory _fake // list of wheter this values are true or not
        ) public 
        onlyAfter(biddingEnd)
        onlyBefore(revealEnd) 
        {
         uint length = bids[msg.sender].length; //lengh of the array of the users   
         require(_values.length == length);// the lenght is equal the amount of bids
         require(_fake.length == length);
         
        // uint refund;// stock the amount that has to be refund, based on bids that werent placed, because they where to small
        for (uint i=0; i<length; i++) {
            Bid storage bidToCheck = bids[msg.sender][i];
            (uint value, bool fake) = (_values[i], _fake[i]);
            if(bidToCheck.blindedBid != keccak256(abi.encodePacked(value, fake))){
                continue; //skips whatever codes comes afterwards,  simple move back to the top for loop and  go to the next iteration
            }
            //if it does goes through, we want to change the value of refund and add the deposit that is saved with this bid
            // refund += bidToCheck.deposit;
            if(!fake && bidToCheck.deposit >= value) {// if what the user has input is false, and tha the bidtochek deposit is equal or bigger we place the bid
                if (!placeBid(msg.sender,  value)) {
                    // refund -= value;// we substract the value from the refund
                    //if its false, tranfer refund to user
                    payable(msg.sender).transfer(bidToCheck.deposit * (1 ether));
                }                
            }
            bidToCheck.blindedBid = bytes32(0);//reset the value of the current bid, reset value of the hash
        }
        // payable(msg.sender).transfer(refund);// declare his address as payable and pay to the user
    }
        


    function auctionEnd() public payable onlyAfter(revealEnd) {
        //this will allow us to say the auction is finished and from thatn moment we can reveal everything
        require(!ended);//ended is false: its not ended
        emit AuctionEnded(highestBidder, highestBid);//Log this value to the blockchain.We call our event. we register this information inside of the blockchain
        ended = true; // auction officially is finished
        //we transfer the amount to the beneficiary
        beneficiary.transfer(highestBid * (1 ether));
    }
    
    function withdraw() public {
        // using the address of the sender. All the addresses of people that are not winners of the auction, and what amount is supposed to be returned to them, they can simply come here and withdraw.
        uint amount = pendingReturns[msg.sender]; // pending return for their address
        if (amount > 0){
            pendingReturns[msg.sender] = 0; //first thing , before we transfer back this amount to the sender we set it to zero so he wont be able to call this function again.
            
            //we declare his address as payable, and we transfer the amount variable
            payable(msg.sender).transfer(amount * (1 ether));
        }
    }
    
    
    function placeBid(address bidder , uint value) internal returns(bool success) { // returns bolean whether it was successful or not
        //- check transfer is done
        //- that the bid is actually recorded inside the object (mapping)
    // when the bidding time is over, we reveal all of the bids that happened.
    // place the bids...
    //1. make shure the value is smaller or equal to the highest bid
        if (value <= highestBid) {
            return false;
        }
        if(highestBidder != address(0)) {//verifies the address is not 0, the burn address...
            pendingReturns[highestBidder] += highestBid;
        }
        highestBid = value;
        highestBidder = bidder;
        return true;
    }
    
    
    
}

// this code from documentatio doesnt work