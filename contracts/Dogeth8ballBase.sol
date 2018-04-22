pragma solidity ^0.4.0;

import "./Dogeth8ballAuth.sol";

contract Dogeth8ballBase is Dogeth8ballAuth {
  event DogeGaveAnswer(address indexed owner, uint256 answerId, uint256 theans);
  event DogeAnswerCount(uint256 answerCount);

  struct DogeAnswer {
    address answerOwner;
    uint256 theans;
  }
  DogeAnswer[] dogeAnswers;
  mapping (uint256 => address) public dogeAnswerToOwner;
  uint256 dogeAnswerCount = 0;

  function _findAnswer(address _owner) internal {
    // Doge look into crystal ball now, and see answer
    uint nowvar = now;
    uint256 rema = nowvar % 24;

    // create an answer struct for the asker to dogeAnswerToOwner
    // because now that we know the answer, we will store it permanently!
    DogeAnswer memory _dogeAnswer = DogeAnswer({
      answerOwner: _owner,
      theans: rema
    });

    uint256 _nextAnswerId = dogeAnswers.push(_dogeAnswer) - 1;

    // emit gave answer event- much decision made now for answer
    DogeGaveAnswer (_owner, _nextAnswerId, rema);

    // track the _owner
    dogeAnswerToOwner[_nextAnswerId] = _owner;

    dogeAnswerCount++;

  }


}
