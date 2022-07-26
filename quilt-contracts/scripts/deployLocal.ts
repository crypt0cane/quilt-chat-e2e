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

  // Check user balance
  const userBalance = await quiltToken.balanceOf(signer1Address);
  console.log("User balance -> " + ethers.utils.formatEther(userBalance));

  // KeyStorage
  const KeyStorage = await ethers.getContractFactory("KeyStorage");
  const keyStorage = await KeyStorage.deploy(quiltToken.address);
  await keyStorage.deployed();

  console.log(
    "\x1b[36m%s\x1b[0m",
    "KeyStorage contract deployed to:",
    keyStorage.address
  );

  // Approve token transaction
  await quiltToken.approve(keyStorage.address, ethers.utils.parseEther("10.0"));
  console.log(
    "Amount approved by user -> " +
      ethers.utils.formatEther(
        await quiltToken.allowance(signer1Address, keyStorage.address)
      )
  );

  // Change username
  await keyStorage.setUsername("LordEvendim");

  console.log("Username changed");
  console.log(
    "Getting username -> " + (await keyStorage.getUsername(signer1Address))
  );

  // Token balances after transactions
  console.log(
    "KeyStorage token balance -> " +
      ethers.utils.formatEther(await quiltToken.balanceOf(keyStorage.address))
  );
  console.log(
    "User token balance -> " +
      ethers.utils.formatEther(await quiltToken.balanceOf(signer1Address))
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
