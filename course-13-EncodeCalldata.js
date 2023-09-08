import { ethers } from "ethers";

const goerli_url = 'https://goerli.infura.io/v3/87a2a63f326b4910ab6846804354d165'
const privateKey =
  "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";

const provider = new ethers.providers.JsonRpcProvider(goerli_url);
const wallet = new ethers.Wallet(privateKey, provider)

// WETH的ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
];
// WETH合约地址（Goerli测试网）
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
// 声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const address = await wallet.getAddress();

const calldata1 = contractWETH.interface.encodeFunctionData('balanceOf', [address]);
const calldata2 = contractWETH.interface.encodeFunctionData('deposit');

const tx1 = {
    to: addressWETH,
    data: calldata1
}

const tx2 = {
    to: addressWETH,
    data: calldata2,
    value:ethers.utils.parseEther("0.0001")
}

const receipt = await wallet.sendTransaction(tx2);
await receipt.wait();
const balanceOfWETH = await provider.call(tx1);
console.log(ethers.utils.formatEther(balanceOfWETH));