// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QuiltToken is ERC20 {
    constructor(uint256 initialSupply, address receiverAddress)
        ERC20("Quilt toknen", "QLT")
    {
        _mint(address(this), initialSupply);
        _mint(address(receiverAddress), 20 * 10**18);
    }
}
