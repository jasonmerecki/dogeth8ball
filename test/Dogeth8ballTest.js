var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  it("should be awesome", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
    })
  })
}

