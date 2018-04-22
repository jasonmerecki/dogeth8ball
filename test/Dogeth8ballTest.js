var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  assert(true, "big fail! woot");

  it("should give an int value when asked", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      var theans = dogeinst.askDoge(params);
      assert((typeof theans === "number"), "askDoge did not give an integer answer");
    })
  }),

  it("should give an int value between 0 and 23", async () => {
    let inst = await Dogeth8ball.deployed();
    var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
    var dogepromise = await dogeinst.askDoge(params);
    console.log("dogepromise " + JSON.stringify(dogepromise) );
    console.log("dogepromise log0 event " + JSON.stringify(dogepromise.logs[0].event) );
    console.log("dogepromise log0 args " + JSON.stringify(dogepromise.logs[0].args) );
  }),

  it("should give an int value between 0 and 23 old", function() {
    var deplcont = Dogeth8ball.deployed();
    return deplcont.then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      var dogepromise = dogeinst.askDoge(params);
      var theans = -1;
      console.log("dogepromise (old) " + dogepromise );
      dogepromise.then(function (val) {
        console.log("got the promise answer: " +JSON.stringify(val) );
      });

      console.log("the answer when asked: " + theans );
      var result = theans >= 0 && theans <= 23;
      console.log("result: " + result );
      assert.true(result , "askDoge answer is out of range");
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

  it("should reject non-dogeOwner from setting wei", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000};
      var theans = dogeinst.setMinWei(1017, params)
        .then(function (val) {
          assert(false, "should revert");
        })
        .catch(function (err) {
          // console.log('Error (presumably not enough wei): ' + err);
        });
    })
  }),

  it("should alow dogeOwner to set wei", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[0], gas:1000000};
      var theans = dogeinst.setMinWei(1017, params)
        .then(function (val) {
          assert(true, "all awesome");
        });
    })
  }),

  it("should alow dogeOwner to count answers", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[0], gas:1000000};
      var theans = dogeinst.findTotalAnswers(params);
      console.log("Total answer count: " + theans );
      assert(theans > 0, "woah, not counting");
    })
  }),

  it("should reject other users from getting count", function() {
    Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      var params = {from: web3.eth.accounts[3], gas:1000000};
      var theans = dogeinst.findTotalAnswers(params).then(function (val) {
          assert(false, "should revert");
        })
        .catch(function (err) {
          // console.log('Error (presumably not enough wei): ' + err);
        });
    })
  })

})

// accounts[0] should be the owner

