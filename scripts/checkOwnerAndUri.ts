import { Contract } from "ethers";
import { ethers } from "hardhat";

const THEODO_UP_NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const DUMMY_ADDRESS = "0x9296bE4959E56b5DF2200DBfA30594504a7feD61";

async function main() {
  const [deployer] = await ethers.getSigners();
  const theodoUpNft = await ethers.getContractAt(
    "TheodoUpNft",
    THEODO_UP_NFT_ADDRESS,
    deployer
  );

  const owner = await theodoUpNft.ownerOf(0);
  const tokenUri = await theodoUpNft.tokenURI(0);

  console.log(owner);
  console.log(tokenUri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
