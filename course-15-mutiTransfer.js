import { ethers, utils } from 'ethers';

const mnemonic = utils.entropyToMnemonic(utils.randomBytes(32));

const hdNode = utils.HDNode.fromMnemonic(mnemonic);

const numWallet = 20
let basePath = "m/44'/60'/0'/0";
let addresses = []
for (let i = 0; i < numWallet; i++) {
    let hdNodes = hdNode.derivePath(basePath + '/' + i);
    let wallets = new ethers.Wallet(hdNodes.privateKey);
    console.log(`第${i + 1}个钱包地址： ${wallets.address}`)
    addresses.push(wallets)
}

const goerli_url = 'https://goerli.infura.io/v3/87a2a63f326b4910ab6846804354d165'
const privateKey =
  "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";

const provider = new ethers.providers.JsonRpcProvider(goerli_url);
const wallet = new ethers.Wallet(privateKey, provider)

const abiAirdrop = [
    "function multiTransferToken(address,address[],uint256[]) external",
    "function multiTransferETH(address[],uint256[]) public payable",
];
// Airdrop合约地址（Goerli测试网）
const addressAirdrop = '0x71C2aD976210264ff0468d43b198FD69772A25fa' // Airdrop Contract
// 声明Airdrop合约
const contractAirdrop = new ethers.Contract(addressAirdrop, abiAirdrop, wallet)

const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
    "function approve(address, uint256) public returns (bool)"
];
// WETH合约地址（Goerli测试网）
const addressWETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' // WETH Contract
// 声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

//读取WETH余额
const balanceWETH = await contractWETH.balanceOf(addresses[10])
console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`)
//读取ETH余额
const balanceETH = await provider.getBalance(addresses[10])
console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`)

const tx = await contractAirdrop.multiTransferETH(addresses);

await tx.wait();
const balanceETH2 = await provider.getBalance(addresses[10])
console.log(`发送后该钱包ETH持仓: ${ethers.formatEther(balanceETH2)}\n`)

const txApprove = await contractWETH.approve(addressAirdrop, ethers.parseEther("1"))
await txApprove.wait()
// 发起交易
const tx2 = await contractAirdrop.multiTransferToken(addressWETH, addresses, amounts)
// 等待交易上链
await tx2.wait()
// console.log(`交易详情：`)
// console.log(tx2)
// 读取WETH余额
const balanceWETH2 = await contractWETH.balanceOf(addresses[10])
console.log(`发送后该钱包WETH持仓: ${ethers.formatEther(balanceWETH2)}\n`)