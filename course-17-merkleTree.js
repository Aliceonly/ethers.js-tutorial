import { keccak256 } from 'ethers/lib/utils';
import { MerkleTree } from 'merkletreejs';

const tokens = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
];

const leaf = tokens.map(x => keccak256(x))

const merkletree = new MerkleTree(leaf, keccak256, { sortPairs: true });

const root = merkletree.getHexRoot()

const proof = merkletree.getHexRoot(leaf[0])

const goerli_url = 'https://goerli.infura.io/v3/87a2a63f326b4910ab6846804354d165'
const privateKey =
  "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";

const provider = new ethers.providers.JsonRpcProvider(goerli_url);
const wallet = new ethers.Wallet(privateKey, provider)

const abiNFT = [
    "constructor(string memory name, string memory symbol, bytes32 merkleroot)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function mint(address account, uint256 tokenId, bytes32[] calldata proof) external",
    "function ownerOf(uint256) view returns (address)",
    "function balanceOf(address) view returns (uint256)",
];

const bytecodeNFT = contractJson.default.object;
const factoryNFT = new ethers.ContractFactory(abiNFT, bytecodeNFT, wallet);

const contractNFT = await factoryNFT.deploy("WTF Merkle Tree", "WTF", root)
console.log(`合约地址: ${contractNFT.target}`);
console.log("等待合约部署上链")
await contractNFT.waitForDeployment()
console.log("合约已上链")

let tx = await contractNFT.mint(tokens[0], "0", proof)

console.log("铸造中，等待交易上链")
await tx.wait()
console.log(`mint成功，地址${tokens[0]} 的NFT余额: ${await contractNFT.balanceOf(tokens[0])}\n`)