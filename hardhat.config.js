require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks:{
    hardhat:{
      chainId: 1337
    },

    // sepolia:{
    //   url: "https://sepolia.infura.io/v3/32b44725c64e4877aecb33de22308573",
    //   accounts: ["b92e7e9977b9a6f58516e6e03c381bb2a480af926baba9ae88b9164aab0c9ea5"],
    //   chainId: 11155111,
    //   gas: 1000000
    // }

    amoy:{
      url: "https://polygon-amoy.infura.io/v3/32b44725c64e4877aecb33de22308573",
      chainId: 80002,
      accounts:["32f30a177d1853d856e9d39a0e2edb6892201ed43a0689e55f5c448ffb9d2b0e"]
    }
  }
};

// 120234995110996591
// 108480495456162059
// 228715490567158650
