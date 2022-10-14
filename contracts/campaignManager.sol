// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "/campaign.sol";

/// @title Greengo Crowdfundign Campaign Manager
contract CampaignManager is Ownable{ 
  IERC20 private GNG = ERC20(0x7c5f44B8Dde8B6692B37e8e70367C1FbAf6e7B6A);
  mapping(uint256 => address) private campaigns;
  uint256 private campaignsCounter = 0;
  event CampaignCreated(address indexed _from, uint256 indexed _id, uint _value);

  function createCampaign(string memory _campaignName,
    uint256 _goalAmount,
    uint256 _duration) public {
    GreengoCampaign campaign = new GreengoCampaign(_campaignName, _goalAmount, _duration);
    campaigns[campaignsCounter] = address(campaign);
    GNG.transfer(address(campaign), _goalAmount); 
    campaignsCounter++;
  }

  function getBalance() public view returns (uint256){
    return GNG.balanceOf(address(this));
  }

  function getCampaignAddress(uint256 _id) public view returns (address){
    return campaigns[_id];
  }
}
