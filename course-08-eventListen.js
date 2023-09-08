import {ethers} from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/wUW64gJZabnbxXjrCDHk4gTlNGztf5LR")

// USDT的合约地址
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)"
];

const USDTContract = new ethers.Contract(contractAddress, abi, provider);

const main = async () => {
    try {
        USDTContract.on('Transfer',(from,to,value) => {
            console.log(
                `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
              )
        })
    } catch (error) {
        console.log(error)
    }
}

main()