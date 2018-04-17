pragma solidity ^0.4.0;

import "./Dogeth8ballAuth.sol";

contract Dogeth8ballBase is Dogeth8ballAuth {
  event DogeAnswerNote(address indexed owner, uint256 theans);
  struct DogeAnswer {
    uint256 theans;
  }
  DogeAnswer[] dogeAnswers;
  mapping (uint256 => address) public dogeAnswerToOwner;
}
