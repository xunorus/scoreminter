// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// has to be a secret ballot
// no one should be able to revert back to you and kwno your name , gender etc.
// we'll use eth address
// rules should be transparent
 contract Ballot {
     
    //  VARIABLES
    struct vote {
        address voterAddress;
        bool choice;
    }
    
    struct voter {
        string voterName;
        bool voted;//boted or not?
    }
    
    
    uint private countResult = 0;// we only see results at the end
    uint public finalResult = 0;// here we communicate the results
    uint public totalVoter = 0;// total amount of voters
    uint public totalVote= 0;// total amount of votes
    
    address public ballotOfficialAddress;
    string public ballotOfficialName;
    string public proposal;
    
    //maping to refer and find our votes and keep list of voters
    mapping(uint => vote) private votes;
    mapping(address => voter) public voterRegister;
    
    enum State{ Created, Voting, Ended }
    State public state;
    
    
    // MODIFIERS
    modifier condition(bool _condition){
        require(_condition);
        _;
    }
    modifier onlyOfficial(){
        require(msg.sender == ballotOfficialAddress);
        _;
    }
    
    modifier inState(State _state){//allows to pass state
        require(state == _state); // //confirm state
        _;
    }   
    
    // EVENTS
    
    
    
    
    // FUNCTIONS
    constructor(  // name and proposal
        string memory _ballotOfficialName,
        string memory _proposal
        )
        {
        ballotOfficialAddress = msg.sender; // the constructor is the person deploying the contract
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;
        
        state = State.Created; // voting has been created
            
        }
    
    //allow the person who created the function to add voter
    function addVoter(address _voterAddress, string memory _voterName)
    public
    inState(State.Created)
    onlyOfficial
    { //allow the official address to add new voters
        voter memory v;
        v.voterName = _voterName;
        v.voted = false; //has not voted
        voterRegister[_voterAddress] = v;
        totalVoter++;
        
    }
    
    // contract starts with state created
    function startVote()
        public
        inState(State.Created)// can only happen when state is Created
        onlyOfficial    
    {   
        state = State.Voting;
        
    }
     
     //allow users to vote
     function doVote(bool _choice)
        public
        inState(State.Voting)
        returns (bool voted)//returns true or not that person has voted
     {
         bool found = false;// found or not this voter address in the registry
         
         if(bytes(voterRegister[msg.sender].voterName).length !=0 
         && !voterRegister[msg.sender].voted ) { //by defaul its set to false, we want this value to be false, just make sure
        // as long as the lenght is diferent than zero we can vote
            voterRegister[msg.sender].voted = true;// this user has voted!
            vote memory v;//new local variable             
            v.voterAddress = msg.sender;
            v.choice = _choice;
            if(_choice) { // if true that voted for the proposal
                countResult++;
            }
            votes[totalVote] = v;
            totalVote++;
            found = true;
         }
         return found;
     }
     
     
     // once everyone has voted
    function endVote()
    public
    inState(State.Voting)
    onlyOfficial
    {
        //here we change the state to ended, we count results and display by adding them inside our finalResult, and use event to send the message to the blockchain
     //changes the state
     state= State.Ended;
     finalResult = countResult;
     
    }     
 }