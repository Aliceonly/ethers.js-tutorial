import { ethers } from "ethers";

// const INFURA_ID = "87a2a63f326b4910ab6846804354d165";
const URL = 'https://sepolia.infura.io/v3/87a2a63f326b4910ab6846804354d165';
const providerSepolia = new ethers.providers.JsonRpcProvider(URL);

const wallet1 = ethers.Wallet.createRandom();
const wallet1WithProvider = wallet1.connect(providerSepolia);
const mnemonic = wallet1.mnemonic;

const privateKey = '61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d';
const wallet2 = new ethers.Wallet(privateKey,providerSepolia);

const wallet3 = ethers.Wallet.fromMnemonic(mnemonic.phrase);

const main = async () => {
    const address1 = await wallet1.getAddress()
    const address2 = await wallet2.getAddress() 
    const address3 = await wallet3.getAddress() // 获取地址
    console.log(`1. 获取钱包地址`);
    console.log(`钱包1地址: ${address1}`);
    console.log(`钱包2地址: ${address2}`);
    console.log(`钱包3地址: ${address3}`);
    console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);

    console.log(`\n2. 获取助记词`);
    console.log(`钱包1助记词: ${mnemonic.phrase}`)

    console.log(`\n3. 获取私钥`);
    console.log(`钱包1私钥: ${wallet1.privateKey}`)
    console.log(`钱包2私钥: ${wallet2.privateKey}`)

    console.log(`\n4. 获取链上交易次数`);
    const txCount1 = await wallet1WithProvider.getTransactionCount();
    const txCount2 = await wallet2.getTransactionCount();
    console.log(`钱包1发送交易次数: ${txCount1}`)
    console.log(`钱包2发送交易次数: ${txCount2}`)

    console.log(`\n5. 发送ETH（测试网）`);
    console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
    console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: address1,
        value: ethers.utils.parseEther("0.001")
    }
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const txReceipt = await wallet2.sendTransaction(tx);
    await txReceipt.wait();
    console.log(txReceipt)
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
    console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
};

main();