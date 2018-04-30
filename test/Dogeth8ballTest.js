var Dogeth8ball = artifacts.require("Dogeth8ball");

contract('Dogeth8ball', function(accounts) {

  it("should send an answer event when asked", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      const dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      return dogeinst.askDoge(params);
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

  it("should give an int value when asked", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      const dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      return dogeinst.askDoge.call(params);
    }).then(function (theansobj) {
      const theans = parseInt(theansobj);
      assert((typeof theans === "number"), "askDoge did not give an integer answer");
    }).catch(function (reason) {
      // error calling the contract function - maybe it does not exist or Ganache is not running
      assert(false, "askDoge did not reply properly, reason: " + reason);
    });
  });

  it("should send an event with an answer between 0 and 23 using async/await syntax", async () => {
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

  it("should give an int value between 0 and 23 using async/await syntax", async () => {
    const dogeinst = await Dogeth8ball.deployed();
    const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
    const theans = await dogeinst.askDoge.call(params);
    const result = theans >= 0 && theans <= 23;
    assert(result , "askDoge answer is out of range");
  });

  it("should send an event with an int value between 0 and 23 using promise syntax", function() {
    const deplcont = Dogeth8ball.deployed();
    return deplcont.then(function (inst) {
      const dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.0000000000000001, "ether")};
      return dogeinst.askDoge(params);
    }).then(function (dogeBlockResult) {
      // this Promise should resolve to the block result
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      const theans = parseInt(dgalog.args.theans);
      const result = theans >= 0 && theans <= 23;
      assert(result , "askDoge answer is out of range");
    }).catch(function (reason) {
      // error calling the contract function - maybe it does not exist or Ganache is not running
      assert(false, "askDoge did not reply properly, reason: " + reason);
    });

  });

  it("should reject if coin value is too small", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.00000000000000009, "ether")};
      return dogeinst.askDoge(params);
    }).then(function (dogeBlockResult) {
      assert(false, "should revert");
    })
      .catch(function (err) {
      // console.log('Error (presumably not enough wei): ' + err);
    });
  });

  it("should reject non-dogeOwner from setting wei", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000};
      return dogeinst.setMinWei(117, params);
    }).then(function (dogeBlockResult) {
      assert(false, "should revert");
    }).catch(function (reason) {
      assert(true, "all awesome " + reason);
    });
  });

  it("should alow dogeOwner to set wei", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[0], gas:1000000};
      return dogeinst.setMinWei(117, params);
    }).then(function (dogeBlockResult) {
      assert(true, "all awesome");
    });
  });

  it("should reject other users from getting count", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000};
      return dogeinst.findTotalAnswers(params);
    }).then(function (val) {
      assert(false, "should revert");
    }).catch(function (reason) {
      assert(true, "all good " + reason);
    });
  });

  it("should alow dogeOwner to get count answers event", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[0], gas:1000000};
      return dogeinst.findTotalAnswers(params);
    }).then(function (dogeBlockResult) {
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeAnswerCount");
      const theans = parseInt(dgalog.args.answerCount);
      assert(theans > 0, "woah, not counting");
    });
  });

  it("should alow dogeOwner to count answers", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[0], gas:1000000};
      return dogeinst.findTotalAnswers.call(params);
    }).then(function (theansobj) {
      const theans = parseInt(theansobj);
      assert(theans > 0, "woah, not counting");
    });
  });

  it("should send event to allow an owner to get their answer", function() {
    var dogeinst;
    var firstAnswerId;
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[3], gas:1000000, value: web3.toWei(0.00000000000000018, "ether")};
      return dogeinst.askDoge(params);
    }).then(function (dogeBlockResult) {
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      firstAnswerId = parseInt(dgalog.args.answerId);
      const params = {from: web3.eth.accounts[3], gas:1000000};
      return dogeinst.findMyDogeAnswer(firstAnswerId, params);
    }).then(function (dogeBlockResult) {
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      const theAnsId = parseInt(dgalog.args.answerId);
      assert(firstAnswerId === theAnsId, "did not return the same answer IDs: " + firstAnswerId + ", " + theAnsId);
    }).catch(function (reason) {
      assert(false, "should have allowed getting an answer: " + reason);
    });
  });

  it("should alow dogeOwner to get an answer they don't own", function() {
    return Dogeth8ball.deployed().then(function (inst) {
      dogeinst = inst;
      const params = {from: web3.eth.accounts[0], gas:1000000};
      return dogeinst.findADogeAnswer(2, params);
    }).then(function (dogeBlockResult) {
      const dgalog = dogeBlockResult.logs.find(log => log.event === "DogeGaveAnswer");
      const theAnsId = parseInt(dgalog.args.answerId);
      assert(theAnsId === 2, "dogeOwner did not get the answer ID requested: " + theAnsId);
    });
  });

})


