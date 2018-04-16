var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  it("should give an int value when asked", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var theans = dogeinst.askDoge();
      assert.equal((typeof theans === "number"), "askDoge did not give an integer answer");
    })
  }),

  it("should give an int value between 0 and 23", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var theans = dogeinst.askDoge();
      assert.equal(theans >= 0 && theans <= 23 , "askDoge answer is out of range");
    })
  })


})

// accounts[0] should be the owner

