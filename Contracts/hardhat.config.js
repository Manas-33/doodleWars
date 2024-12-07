require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    base_sepolia: {
      chainId:84532,
      url: `https://sepolia.base.org`,
      accounts: ['5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef'],
    },
  },
};
