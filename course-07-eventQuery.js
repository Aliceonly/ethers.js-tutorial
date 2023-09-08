import {ethers} from 'ethers';

const INFURA_ID = "87a2a63f326b4910ab6846804354d165";
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

// const privateKey =
//   "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";
// const wallet = new ethers.Wallet(privateKey, provider);

const addressWETH = '0xc778417e063141139fce010982780140aa0cd5ab'

const abiWETH = [
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const contractWETH = new ethers.Contract(addressWETH,abiWETH,provider)

async function main() {
  const block = await provider.getBlockNumber();
  console.log(`当前区块高度: ${block}`);

  const txEvent = await contractWETH.queryFilter('Transfer',block - 10,block)
  console.log(`事件数: ${txEvent.length}`)
  console.log(txEvent[0])
}

main()