// Import Hardhat Runtime Environment explicitly
const hre = require("hardhat");

async function main() {

  await hre.run("compile");

  const tokenAddress="0x07FCBd2412E0fFd9eaE62daBCC86D790f36161D5"

  const ContractFactory = await hre.ethers.getContractFactory("EthindiaContract");

  console.log("Deploying contract...");
  const contract = await ContractFactory.deploy();
  
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
