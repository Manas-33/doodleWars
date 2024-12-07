// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DOOD is ERC20 {
    constructor() ERC20("DOODLEWARS", "DOODLE") {
        _mint(msg.sender, 1000000 ether);
    }

    function approveCustom(
        address owner,
        address spender,
        uint256 value
    ) public returns (bool) {
        _approve(owner, spender, value);
        return true;
    }
}
