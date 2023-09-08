import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/wUW64gJZabnbxXjrCDHk4gTlNGztf5LR"
);

// USDT的合约地址
const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const accountBinance = "0x28C6c06298d514Db089934071355E5743bf21d60";
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];

const USDTContract = new ethers.Contract(contractAddress, abi, provider);

const main = async () => {
  console.log("\n1. 读取币安热钱包USDT余额");
  const balance = await USDTContract.balanceOf(accountBinance);
  console.log(
    `USDT余额: ${ethers.utils.formatUnits(ethers.BigNumber.from(balance), 6)}\n`
  );

  console.log("\n2. 创建过滤器，监听转移USDT进交易所");
  let filter1 = USDTContract.filters.Transfer(null, accountBinance);

  USDTContract.on(filter1, (from, to, value) => {
    console.log(
      `${from} -> ${to} ${ethers.utils.formatUnits(
        ethers.BigNumber.from(value),
        6
      )}`
    );
  });
};

main();
