const Dogeth8ballAuth = artifacts.require("./Dogeth8ballAuth.sol")
const Dogeth8ballBase = artifacts.require("./Dogeth8ballBase.sol")
const Dogeth8ball = artifacts.require("./Dogeth8ball.sol")

module.exports = function(deployer) {
  // consider {from: "0x...."}
  deployer.deploy(Dogeth8ballAuth);
  deployer.deploy(Dogeth8ballBase);
  deployer.deploy(Dogeth8ball);
};

