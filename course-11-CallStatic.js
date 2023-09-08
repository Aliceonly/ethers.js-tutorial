import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/wUW64gJZabnbxXjrCDHk4gTlNGztf5LR"
);

const wallet = new ethers.Wallet.createRandom();

// DAI的ABI
const abiDAI = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
];
// DAI合约地址（主网）
const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract
// 创建DAI合约实例
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

async function main() {
  try {
    console.log("\n1. 读取测试钱包的DAI余额");
    const balance = await contractDAI.balanceOf(wallet.getAddress());
    console.log(`DAI持仓: ${ethers.utils.formatEther(balance)}\n`);

    console.log(
      "\n2.  用callStatic尝试调用transfer转账1 DAI，msg.sender为V神地址"
    );
    const tx = contractDAI.callStatic.transfer(
      "vitalik.eth",
      ethers.utils.parseEther("10000"),
      { from: "vitalik.eth" }
    );
    console.log(`交易会成功吗？：`, tx);

    console.log(
      "\n3.  用callStatic尝试调用transfer转账1 DAI，msg.sender为测试钱包地址"
    );
    const tx2 = await contractDAI.callStatic.transfer(
      "vitalik.eth",
      ethers.utils.parseEther("10000"),
      { from: wallet.getAddress() }
    );
    console.log(`交易会成功吗？：`, tx2);
  } catch (error) {
    console.log(error);
  }
}

main();
