const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = '34dbd517f00b432da4b0add54abbfce2';
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 5500000,        // rinkeby has a lower block limit than mainnet
        //gasPrice: 10000000000,
        confirmations: 0,    
        timeoutBlocks: 200,  
        skipDryRun: true   
    },
  },
  compilers: {
    solc: {
      version: "^0.5.2"
    }
  }
}
