// SPDX-License-Identifier: GPL-3.0
pragma solidity ^ 0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"][1,1]
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

// define the item
contract MsharesCollabMarket {
    
        //  VARIABLES

    struct AuctionItem {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
         address payable  artistA;//this is the caller and owner of NFT
        uint256 askingPrice;
        bool isSold;// flag to indicate if the item has benn sold or not
        // address payable seller;
        // address owner;
        // address payable  artistB;
    }
  
  
    uint public prize;
    address payable  artistB;

    // EVENTS
    // define some events
    AuctionItem[] public itemsForSale; //array of items for sale
    mapping(address => mapping(uint256 => bool)) activeItems;//// the purposo of this is to avoid loop through the array. True is on sale.
    
    
    event itemAdded(uint256 id, uint256 tokenId, address tokenAddress, uint256 askingPrice);// what is the difference between the auction id and the token id?
    event itemSold(uint256 id, address buyer, uint256 askingPrice);




// MODIFIERS
    modifier OnlyItemOwner(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.ownerOf(tokenId) == msg.sender);// the caller is the owner of this especific token
        _;
    }

    modifier HasTransferApproval(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.getApproved(tokenId) == address(this));
        _;
    }

    modifier ItemExists(uint256 id) {
        require(id < itemsForSale.length && itemsForSale[id].id == id, "Ups, we could not find item!");
        _;
    }


    modifier IsForSale(uint256 id) {
        require(itemsForSale[id].isSold == false, "Item is already sold!");
        _;
    }
    
    
    // FUNCTIONS

// percentage calculator functions  uint128 public bp = 185; // 1.85% in basis points (parts per 10,000)
//   uint128 public bp = 185; // 1.85% in basis points (parts per 10,000)
  uint128 public bp = 1100; // 11% in basis points (parts per 10,000)

  function calculatePercentage( uint256 theNumber ) public view  returns (uint256) {
    // return uint128(int256(theNumber) / int256(10000) * int256(bp));
    return theNumber * bp / 10000;

  }

    //takes tokenid, address of the  token, and the price
    //OnlyItemOwner modifier makes sure only the owner of the item can put it up for sale
    // HasTransferApproval checks this contract has approval of tranfering the item on behalf of the user
    function addItemToMarket(uint256 tokenId, address tokenAddress, uint256 askingPrice) OnlyItemOwner(tokenAddress, tokenId) HasTransferApproval(tokenAddress, tokenId) external returns(uint256) {
    //ejemplo
    //addItemToMarket(nftId, TOKEN_CONTRACT_ADDRESS, createItemPriceField.value)
        require(activeItems[tokenAddress][tokenId] == false, "Item is already up for sale");
        uint256 newItemId = itemsForSale.length;// the id of the item
        itemsForSale.push(AuctionItem(newItemId, tokenAddress, tokenId, payable(msg.sender), askingPrice, false));//we push a new auction item
        //AHA! el newItemId es el id dentro del marketplace y el otro es el id del token en relacion a su contrato
        activeItems[tokenAddress][tokenId] = true;// is now true, up fo sale!

        assert(itemsForSale[newItemId].id == newItemId);// assert that the items for sale of this newId es igual a newId, just to check!
        emit itemAdded(newItemId, tokenId, tokenAddress, askingPrice);
        return newItemId;
    }

    function addCollabArtist(){
        
    }


    function buyitem(uint256 id) payable external ItemExists(id) IsForSale(id) HasTransferApproval(itemsForSale[id].tokenAddress, itemsForSale[id].tokenId) {
    //ejemplo
    //   await marketplaceContract.methods.buyitem(item.uid).send({ from: user.get('ethAddress'), value: item.askingPrice });
        require(msg.value >= itemsForSale[id].askingPrice, "Not enough funds sent");
        require(msg.sender != itemsForSale[id].artistA); //check the buyer is no the same as the seller

        itemsForSale[id].isSold = true;
        activeItems[itemsForSale[id].tokenAddress][itemsForSale[id].tokenId] == false;// set this activeItems to false
        
        
        IERC721(itemsForSale[id].tokenAddress).safeTransferFrom(itemsForSale[id].artistA, msg.sender, itemsForSale[id].tokenId);//transfiere el token
        
        
        prize = msg.value - calculatePercentage(msg.value);// resta el porcentage de marketplace
        // prize =calculatePercentage(msg.value);// resta el porcentage de marketplace

        uint splitedPrize = prize/2;//splits into 2

// if normal
        //tranfer the funds
        // itemsForSale[id].artistA.transfer(prize);
        
// if collab
        //send the funds to each artist
        itemsForSale[id].artistA.transfer(splitedPrize);
        artistB.transfer(splitedPrize);
        // artistA.transfer(splitedPrize);
        
        

        emit itemSold(id, msg.sender, itemsForSale[id].askingPrice); //emits itemSold event!
    }




}