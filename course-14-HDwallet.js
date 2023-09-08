import { ethers, utils } from 'ethers';

const mnemonic = utils.entropyToMnemonic(utils.randomBytes(32));

const hdNode = utils.HDNode.fromMnemonic(mnemonic);

const numWallet = 20
let basePath = "m/44'/60'/0'/0";
let wallet = []
for (let i = 0; i < numWallet; i++) {
    let hdNodes = hdNode.derivePath(basePath + '/' + i);
    let wallets = new ethers.Wallet(hdNodes.privateKey);
    console.log(`第${i + 1}个钱包地址： ${wallets.address}`)
    wallet.push(wallets)
}

const walletFromMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
const pwd = 'password';
const json = await walletFromMnemonic.encrypt(pwd);

const walletJson = await ethers.Wallet.fromEncryptedJson(json, pwd);
