var web3 = require('web3');
var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
  deployer.deploy(Token, "KendallCoin", "KRC", web3.utils.toWei("0.1"));
};
