require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    //testnets
    mumbai: {
      provider: () => new HDWalletProvider(process.env.DEPLOY_MNEMONIC, process.env.ALCHEMY_URL_MUMBAI),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 5,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "pragma",
    }
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    polygonscan: process.env.POLYGON_SCAN_API_KEY
  }
};
