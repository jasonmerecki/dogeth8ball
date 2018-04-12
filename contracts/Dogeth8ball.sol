pragma solidity ^0.4.18;

import "./Dogeth8ballAuth.sol";

contract Dogeth8ball is Dogeth8ballAuth {
    function Dogeth8ball() public {
        // let's begin!
        dogeOwner = msg.sender;
    }
}


