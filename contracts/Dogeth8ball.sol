pragma solidity ^0.4.18;

import "./Dogeth8ballAuth.sol";

contract Dogeth8ball is Dogeth8ballAuth {

    uint private coinSlot; // money goes in here

    function Dogeth8ball() public  {
        // let's begin!
        dogeOwner = msg.sender;
    }

    function AskDoge() public payable returns (uint256) {
        coinSlot = coinSlot + msg.value;
        uint256 theans = _findAnswer();
        return theans;
    }

    function _findAnswer() internal view returns (uint256) {
        uint nowvar = now;
        uint256 rema = nowvar % 24;
        return rema;
    }
}

