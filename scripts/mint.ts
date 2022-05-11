import { Contract } from "ethers";
import { ethers } from "hardhat";
import { create, urlSource } from "ipfs-http-client";
const ipfs = create({ url: "http://localhost:5001/api/v0" });
const addOptions = {
  pin: true,
};

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const THEODO_UP_NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const DUMMY_ADDRESS = "0x9296bE4959E56b5DF2200DBfA30594504a7feD61";

const THEODO_IMG_URL =
  "https://imgs.search.brave.com/T_rKK1NiGK_3_6cSbSQ_pSv9b5ua1R1Yb8fWWWP-H_s/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9wYnMu/dHdpbWcuY29tL3By/b2ZpbGVfaW1hZ2Vz/LzM1Njg2ODY1ODcv/MzYwMzRkY2NlYzU4/MzdiZjAzYWIzODNj/ZTk5ZDg4YWFfNDAw/eDQwMC5wbmc";

async function main() {
  const [deployer] = await ethers.getSigners();
  const theodoUpNft = await ethers.getContractAt(
    "TheodoUpNft",
    THEODO_UP_NFT_ADDRESS,
    deployer
  );
  const ipfsResponse = await ipfs.add(urlSource(THEODO_IMG_URL), addOptions);
  const imageURI = `${IPFS_GATEWAY}${ipfsResponse.cid}`;
  const NftMetadata = {
    name: "Test Nft",
    description: "Craftsman",
    external_url: `theodo.fr`,
    image: imageURI,
  };
  const tokenURI = await addToIpfs(NftMetadata);
  const mint = await mintNewNft(DUMMY_ADDRESS, tokenURI, theodoUpNft);
  console.log(JSON.stringify(mint, null, 2));
}

async function addToIpfs(object: object) {
  // Adding the metadata object to ipfs
  console.log("Adding Metadata to IPFS...");
  const { cid } = await ipfs.add(JSON.stringify(object), addOptions);
  const URI = `${IPFS_GATEWAY}${cid}`;
  console.log("Added Metadata to IPFS with address: ", URI);
  return URI;
}

async function mintNewNft(
  toAddress: string,
  tokenURI: string,
  contractInstance: Contract
) {
  console.log("Minting Token with URI", tokenURI);
  const newNftId = await contractInstance.awardUp(toAddress, tokenURI);
  return newNftId;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
