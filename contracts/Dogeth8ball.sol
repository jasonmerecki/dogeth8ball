pragma solidity ^0.4.18;

import "./Dogeth8ballBase.sol";

contract Dogeth8ball is Dogeth8ballBase {

    uint private coinSlot; // money goes in here

    function Dogeth8ball() public  {
        // let's begin!
        dogeOwner = msg.sender;
    }

    function askDoge() public payable hasMinWei  {
        coinSlot = coinSlot + msg.value;
        _findAnswer(msg.sender);
    }

    function findMyDogeAnswer(uint256 _dogeAnswerId) public {
        address _owner = dogeAnswerToOwner[_dogeAnswerId] ;
        require(_owner == msg.sender);
        DogeAnswer memory _dogeAnswer = dogeAnswers[_dogeAnswerId];
        DogeGaveAnswer (_dogeAnswer.answerOwner, _dogeAnswerId, _dogeAnswer.theans);
    }

    function findADogeAnswer(uint256 _dogeAnswerId) public onlyDogeOwner {
        DogeAnswer memory _dogeAnswer = dogeAnswers[_dogeAnswerId];
        DogeGaveAnswer (_dogeAnswer.answerOwner, _dogeAnswerId, _dogeAnswer.theans);
    }

    function findTotalAnswers() public onlyDogeOwner {
        DogeAnswerCount(dogeAnswerCount);
    }

}


