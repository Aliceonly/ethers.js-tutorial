import { ethers } from "ethers";

const INFURA_ID = "87a2a63f326b4910ab6846804354d165";
const providerSepolia = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

const main = async () => {
  console.log("1. 查询vitalik在主网和Goerli测试网的ETH余额");
  const balance = await providerSepolia.getBalance(`vitalik.eth`);
  console.log(
    `SepoliaETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`
  );

  console.log("\n2. 查询provider连接到了哪条链");
  const network = await providerSepolia.getNetwork();
  console.log(network);

  console.log("\n3. 查询区块高度");
  const blockNumber = await providerSepolia.getBlockNumber();
  console.log(blockNumber);

  console.log("\n4. 查询当前gas price");
  const gasPrice = await providerSepolia.getGasPrice();
  console.log(gasPrice);

  console.log("\n5. 查询当前建议的gas设置");
  const feeData = await providerSepolia.feeData();
  console.log(feeData);

  console.log("\n6. 查询区块信息");
  const block = await providerETH.getBlock(0);
  console.log(block);

  console.log("\n7. 给定合约地址查询合约bytecode，例子用的WETH地址");
  const code = await providerETH.getCode(
    "0xc778417e063141139fce010982780140aa0cd5ab"
  );
  console.log(code);
};

main();