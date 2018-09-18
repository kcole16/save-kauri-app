var web3 = require('web3');
var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
  deployer.deploy(Token, "KauriSeedling", "KRI", web3.utils.toWei("0.1"));
};
