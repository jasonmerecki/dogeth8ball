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

    function findMyDogeEvent(uint256 _dogeAnswerId) public view returns (uint256) {
        address _owner = dogeAnswerToOwner[_dogeAnswerId] ;
        require(_owner == msg.sender);
        DogeAnswer memory _dogeAnswer = dogeAnswers[_dogeAnswerId];
        return _dogeAnswer.theans;
    }

    function findADogeEvent(uint256 _dogeAnswerId) public view onlyDogeOwner returns (uint256) {
        DogeAnswer memory _dogeAnswer = dogeAnswers[_dogeAnswerId];
        return _dogeAnswer.theans;
    }

}


