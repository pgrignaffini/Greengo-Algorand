// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MyToken is ERC20 {
    uint256 constant maxMint = 100 * (10**18);

    constructor() ERC20("GNG Coin", "GNG") {
    }

    /// @dev mints a given amount of tokens to the sender
    function transferAll(address _address) public {
        _mint(_address, maxMint);
    }
}
