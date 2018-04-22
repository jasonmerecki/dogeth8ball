var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  it("should give an int value when asked", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      const dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      return answerPromise = dogeinst.askDoge(params);
    }).then(function (dogeBlockResult) {
      // this Promise should resolve to the block result
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      const theans = parseInt(dgalog.args.theans);
      assert((typeof theans === "number"), "askDoge did not give an integer answer");
    }).catch(function (reason) {
      // error calling the contract function - maybe it does not exist or Ganache is not running
      assert(false, "askDoge did not reply properly, reason: " + reason);
    });
  });

  it("should give an int value between 0 and 23 using async/await syntax", async () => {
    const dogeinst = await Dogeth8ball.deployed();
    const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
    const dogeBlockResult = await dogeinst.askDoge(params);
    // console.log("dogeBlockResult " + JSON.stringify(dogeBlockResult) );
    // find the DogeGaveAnswer event, and get theans value
    const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
    const theans = parseInt(dgalog.args.theans);
    const result = theans >= 0 && theans <= 23;
    assert(result , "askDoge answer is out of range");
  });

  it("should give an int value between 0 and 23 using promise syntax", function() {
    const deplcont = Dogeth8ball.deployed();
    return deplcont.then(function (inst) {
      const dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      return answerPromise = dogeinst.askDoge(params);
    }).then(function (dogeBlockResult) {
      // this Promise should resolve to the block result
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      const theans = parseInt(dgalog.args.theans);
      var result = theans >= 0 && theans <= 23;
      assert(result , "askDoge answer is out of range");
    }).catch(function (reason) {
      // error calling the contract function - maybe it does not exist or Ganache is not running
      assert(false, "askDoge did not reply properly, reason: " + reason);
    });

  });

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

