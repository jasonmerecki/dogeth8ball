var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  it("should give an int value when asked", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      var theans = dogeinst.askDoge(params);
      assert.equal((typeof theans === "number"), "askDoge did not give an integer answer");
    })
  }),

  it("should give an int value between 0 and 23", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      var theans = dogeinst.askDoge(params);
      assert.equal(theans >= 0 && theans <= 23 , "askDoge answer is out of range");
    })
  }),

  it("should reject if coin value is too small", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.00000000000000009, "ether")};
      var theans = dogeinst.askDoge(params)
        .then(function (val) {
          assert(false, "should revert");
        })
        .catch(function (err) {
          // console.log('Error (presumably not enough wei): ' + err);
        });
    })
  }),

  it("should reject non-owner from setting wei", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000};
      var theans = dogeinst.setMinWei(100, params)
        .then(function (val) {
          assert(false, "should revert");
        })
        .catch(function (err) {
          // console.log('Error (presumably not enough wei): ' + err);
        });
    })
  }),

  it("should alow owner to set wei", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[0], gas:1000000};
      var theans = dogeinst.setMinWei(100, params)
        .then(function (val) {
          assert(true, "all aweseome");
        });
    })
  })

})

// accounts[0] should be the owner

