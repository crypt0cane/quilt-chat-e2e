import { ethers } from "hardhat";

const main = async () => {
  const [signer1] = await ethers.getSigners();
  const signer1Address = signer1.address;

  // Quilt Token
  const QuiltToken = await ethers.getContractFactory("QuiltToken");
  const quiltToken = await QuiltToken.deploy(
    ethers.utils.parseEther("20.0"),
    signer1Address
  );
  await quiltToken.deployed();

  console.log(
    "\x1b[36m%s\x1b[0m",
    "QuiltToken contract deployed to:",
    quiltToken.address
  );

  // KeyStorage
  const KeyStorage = await ethers.getContractFactory("KeyStorage");
  const keyStorage = await KeyStorage.deploy(quiltToken.address);
  await keyStorage.deployed();

  console.log(
    "\x1b[36m%s\x1b[0m",
    "KeyStorage contract deployed to:",
    keyStorage.address
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
