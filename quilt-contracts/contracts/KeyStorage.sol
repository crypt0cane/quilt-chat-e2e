//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KeyStorage {
    address private owner;
    IERC20 private quiltToken;
    uint256 usernameChangeFee = 10 * 10**18;

    struct Point {
        uint256 x;
        uint256 y;
    }

    mapping(address => Point) public usersToKeys;
    mapping(address => string) public usernames;
    mapping(bytes32 => bool) public takenUsernames;

    event KeyPublished(address publisher);
    event UsernameChanged(address userAddress, string username);

    constructor(address quiltTokenAddress) {
        owner = msg.sender;
        quiltToken = IERC20(quiltTokenAddress);
    }

    function setUsername(string calldata newUsername) public {
        require(
            takenUsernames[keccak256(abi.encode(newUsername))] == false,
            "username already taken"
        );

        // token payment
        uint256 allowedValue = quiltToken.allowance(msg.sender, address(this));

        require(allowedValue >= usernameChangeFee, "not enough tokens");

        quiltToken.transferFrom(msg.sender, address(this), usernameChangeFee);

        usernames[msg.sender] = newUsername;
        takenUsernames[keccak256(abi.encode(newUsername))] = true;

        emit UsernameChanged(msg.sender, newUsername);
    }

    function isUsernameAvailable(string calldata username)
        public
        view
        returns (bool)
    {
        return takenUsernames[keccak256(abi.encode(username))] == true;
    }

    function getUsername(address userAddress)
        public
        view
        returns (string memory)
    {
        return usernames[userAddress];
    }

    function setUserKey(uint256 _x, uint256 _y) public {
        usersToKeys[msg.sender] = Point({x: _x, y: _y});
        emit KeyPublished(msg.sender);
    }

    function getUserKey(address userAddress)
        public
        view
        returns (Point memory)
    {
        require(userAddress != address(0), "wrong address");

        return usersToKeys[userAddress];
    }
}
