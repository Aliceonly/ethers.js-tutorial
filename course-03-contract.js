import { ethers } from "ethers";

const INFURA_ID = "87a2a63f326b4910ab6846804354d165";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);


const main = async () => {
    const name = await contractDAI.name();
    const symbol = await contractDAI.symbol();
    const totalSupply = await contractDAI.totalSupply();
    console.log("\n1. 读取WETH合约信息")
    console.log(`合约地址: ${addressDAI}`)
    console.log(`名称: ${name}`)
    console.log(`代号: ${symbol}`)
    console.log(`总供给: ${ethers.utils.formatEther(totalSupply)}`)
    const balance = await contractDAI.balanceOf('vitalik.eth');
    console.log(`Vitalik持仓: ${ethers.utils.formatEther(balance)}\n`)
}

main()