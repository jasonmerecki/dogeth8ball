pragma solidity ^0.4.18;

import "./Dogeth8ballBase.sol";

contract Dogeth8ball is Dogeth8ballBase {

    uint private coinSlot; // money goes in here

    function Dogeth8ball() public  {
        // let's begin!
        dogeOwner = msg.sender;
    }

    function askDoge() public payable hasMinWei returns (uint256) {
        coinSlot = coinSlot + msg.value;
        uint256 theans = _findAnswer(msg.sender);
        return theans;
    }


}


