pragma solidity ^0.4.18;

/// @title setting up the Auth permissions
/// @author Jason Merecki
contract Dogeth8ballAuth {
    // me!
    address public dogeOwner;

    bool public paused = false;
    uint public minWei = 100;

    /// @dev Access modifier for only doge owner (me!)
    modifier onlyDogeOwner() {
        require(msg.sender == dogeOwner);
        _;
    }

    /// @dev Assigns a new address to doge owner (not me?)
    function setDogeOwner(address _newDogeOwner) public onlyDogeOwner {
        require(_newDogeOwner != address(0));
        dogeOwner = _newDogeOwner;
    }

    function withdrawBalance() external onlyDogeOwner {
        dogeOwner.transfer(this.balance);
    }

    modifier hasMinWei() {
        require(msg.value >= minWei);
        // do the rest
        _;
    }

    function setMinWei(uint newMinWei) public onlyDogeOwner {
        minWei = newMinWei;
    }

}

