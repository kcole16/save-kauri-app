const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
let secrets;
if (fs.existsSync('secrets.json')) {
 secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
}

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 4612388
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      gas: 4612388
    },
    rinkeby: {
          provider: new HDWalletProvider(secrets.mnemonic, 'https://rinkeby.infura.io/v3/'+secrets.infuraApiKey),
          network_id: '4'
    }
  }
};
