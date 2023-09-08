import { ethers } from "ethers";

const INFURA_ID = "87a2a63f326b4910ab6846804354d165";
const URL = "https://sepolia.infura.io/v3/87a2a63f326b4910ab6846804354d165";
// const providerSepolia = new ethers.providers.JsonRpcProvider(URL);
const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${INFURA_ID}`
);

const privateKey =
  "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";
const wallet = new ethers.Wallet(privateKey, provider);

const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
  "function transfer(address, uint) public returns (bool)",
  "function withdraw(uint) public",
];

const addressWETH = "0xc778417e063141139fce010982780140aa0cd5ab";

const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

const address = await wallet.getAddress();

const main = async () => {
  console.log("\n1. 读取WETH余额");

  const balanceWETH = await contractWETH.balanceOf(address);
  console.log(`存款前WETH持仓: ${ethers.utils.formatEther(balanceWETH)}\n`);

  console.log("\n2. 调用desposit()函数，存入0.001 ETH");

  const tx = await contractWETH.deposit({
    value: ethers.utils.parseEther("0.001"),
  });
  await tx.wait();
  const balanceWETH_deposit = await contractWETH.balanceOf(address);
  console.log(
    `存款后WETH持仓: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`
  );

  console.log("\n3. 调用transfer()函数，给vitalik转账0.001 WETH");
  // 发起交易
  const tx2 = await contractWETH.transfer(
    "vitalik.eth",
    ethers.utils.parseEther("0.001")
  );
  // 等待交易上链
  await tx2.wait();
  const balanceWETH_transfer = await contractWETH.balanceOf(address);
  console.log(
    `转账后WETH持仓: ${ethers.utils.formatEther(balanceWETH_transfer)}\n`
  );
};

main();
