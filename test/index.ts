import { expect } from "chai";
import { ethers } from "hardhat";

describe("TheodoUpNft", function () {
  it("Should deploy and award an up", async function () {
    const TheodoUpNft = await ethers.getContractFactory("TheodoUpNft");
    const theodoUpNft = await TheodoUpNft.deploy();

    await theodoUpNft.deployed();

    const testNft = await theodoUpNft.awardUp(
      "0x9296be4959e56b5df2200dbfa30594504a7fed61",
      "test.com"
    );

    const tokenUri = await theodoUpNft.tokenURI(0);
    const tokenOwner = await theodoUpNft.ownerOf(0);
    expect(tokenUri).to.equal("test.com");
    expect(tokenOwner).to.equal("0x9296bE4959E56b5DF2200DBfA30594504a7feD61");
  });
});
