// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Greengo Crowdfundign Campaign
contract GreengoCampaign is Ownable{ 
  IERC20 private CUSD = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
  IERC20 private GNG = ERC20(0x7c5f44B8Dde8B6692B37e8e70367C1FbAf6e7B6A);
  string private campaignName; 
  uint256 private goalAmount;  
  uint256 private amountCollected = 0; 
  uint256 private endDate;


 struct Donation {  
   address donor;
   uint256 timestamp;  
   uint256 amount;
  }

  mapping(uint256 => Donation) private donations;
  uint256 private donationsCounter = 0;
 
 
  event DonationOccurred(address indexed _from, uint256 indexed _id, uint _value);
  event FundsClaimed(address indexed _from, uint _value);

  constructor(
    string memory _campaignName, // change to byte32
    uint256 _goalAmount,
    uint256 _duration //in days
    ) {
        campaignName = _campaignName;
        goalAmount = _goalAmount;
        endDate = block.timestamp + (_duration*86400);
    }

    function claimFunds() public onlyOwner {
        //require(block.timestamp < endDate, "The funding phase is still in progress.");
        require(
		  CUSD.transfer(
			owner(),
			amountCollected
		  ),
		  "Transfer failed."
		);
    emit FundsClaimed(msg.sender, amountCollected);
    amountCollected = 0;
    }

    function donate(uint _amount) public payable{
        uint256 allowance = CUSD.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Allowance is not enough.");
        require(block.timestamp < endDate, "The funding phase of this project is ended.");
        require(
		  CUSD.transferFrom(
			msg.sender,
			address(this),
			_amount
		  ),
		  "Transfer failed."
		);
        donations[donationsCounter] = Donation(msg.sender, block.timestamp, _amount);
        donationsCounter++;
        amountCollected += _amount;
        GNG.transfer(msg.sender, _amount);
        emit DonationOccurred(msg.sender, 3 , _amount);
    }

    function getGoalAmount() public view returns(uint256){
      return goalAmount;
    }

    function getAmountCollected() public view returns(uint256){
      return amountCollected;
    }

    function getDonationsDetails(uint256 _id) public view returns(Donation memory){
      return donations[_id];
    }

    function getDonationsCounter() public view returns(uint256){
      return donationsCounter;
    }
}
