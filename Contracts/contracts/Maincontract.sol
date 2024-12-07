// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthindiaContract {
    address public contractDeployer;
    address public scribbleweb3tokenAddress=0x07FCBd2412E0fFd9eaE62daBCC86D790f36161D5;
    IERC20 public scribbleweb3token;

    constructor() {
        contractDeployer = msg.sender;
        scribbleweb3token = IERC20(scribbleweb3tokenAddress);
    }

    struct createdRoom {
        string roomName;
        address creatorAddress;
        uint256 noOfPlayers;
    }

    struct tokenStakerWalletAddress {
        address walletAddress;
        uint256 stakedAmount;
    }

    mapping(address => createdRoom) public oneCreatedRoom;

    // Events Created
    event createdRoomEvent(
        string RoomName,
        address WalletAddress,
        uint256 playersCount
    );

    event stakedTokens(address tokenStakerAddress, uint256 amount);

    //CreateRoom
    function createRoom(
        string memory _createdRoomName,
        address _roomCreatorAddress,
        uint256 _noofPlayers
    ) external payable {
        createdRoom storage newlyCreatedRoom = oneCreatedRoom[msg.sender];
        newlyCreatedRoom.roomName = _createdRoomName;
        newlyCreatedRoom.creatorAddress = _roomCreatorAddress;
        newlyCreatedRoom.noOfPlayers = _noofPlayers;

        emit createdRoomEvent(
            _createdRoomName,
            _roomCreatorAddress,
            _noofPlayers
        );
    }

    //RetriveRoom
    function giveParticluarroomName(
        address _roomcreator
    ) public view returns (string memory) {
        return oneCreatedRoom[_roomcreator].roomName;
    }

    function giveParticularCreatorAddress(
        address _roomcreator
    ) public view returns (address) {
        return oneCreatedRoom[_roomcreator].creatorAddress;
    }

    function giveParticularNoOfPlayers(
        address _roomcreator
    ) public view returns (uint256) {
        return oneCreatedRoom[_roomcreator].noOfPlayers;
    }

    function stakeTokensInRoom(uint256 _amount) external payable {
        scribbleweb3token.transferFrom(msg.sender, address(this), _amount);
        emit stakedTokens(msg.sender, _amount);
    }

    function contractBalanceofscribbleweb3token()
        public
        view
        returns (uint256)
    {
        return scribbleweb3token.balanceOf(address(this));
    }

    function transferAllFundsToContract(
        address _WinnerAddress
    ) external payable {
        uint256 contractTokenBalance = contractBalanceofscribbleweb3token();
        scribbleweb3token.transferFrom(
            address(this),
            _WinnerAddress,
            contractTokenBalance
        );
    }

    receive() external payable {}
}
