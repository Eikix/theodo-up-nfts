// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
// import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TheodoUpNft = await ethers.getContractFactory("TheodoUpNft");
  const theodoUpNft = await TheodoUpNft.deploy();

  await theodoUpNft.deployed();

  console.log("TheodoUpNft deployed to:", theodoUpNft.address);
  // fs.writeFileSync(
  //   "../constants/addresses/address.json",
  //   JSON.stringify({ contractAddress: theodoUpNft.address })
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
