import { ethers } from "ethers";

const goerli_url =
  "https://goerli.infura.io/v3/87a2a63f326b4910ab6846804354d165";
const privateKey =
  "61a9fae2a22f051baa6cd934a3e5ca23834797b771ed1b1db913a536cd5ce63d";

const provider = new ethers.providers.JsonRpcProvider(goerli_url);
const wallet = new ethers.Wallet(privateKey, provider);

const account = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const tokenId = "0";

const msgHash = ethers.solidityKeccak256(
  ["address", "uint256"],
  [account, tokenId]
);

const main = async () => {
  const signature = await wallet.signMessage(ethers.getBytes(msgHash));
  const abiNFT = [
    "constructor(string memory _name, string memory _symbol, address _signer)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function mint(address _account, uint256 _tokenId, bytes memory _signature) external",
    "function ownerOf(uint256) view returns (address)",
    "function balanceOf(address) view returns (uint256)",
  ];

  const bytecodeNFT = contractJson.default.object;
  const factoryNFT = new ethers.ContractFactory(abiNFT, bytecodeNFT, wallet);

  const balanceETH = await wallet.getBalance();

  // 部署合约，填入constructor的参数
  const contractNFT = await factoryNFT.deploy(
    "WTF Signature",
    "WTF",
    wallet.address
  );
  console.log(`合约地址: ${contractNFT.target}`);
  console.log("等待合约部署上链");
  await contractNFT.waitForDeployment();
  // 也可以用 contractNFT.deployTransaction.wait()
  console.log("合约已上链");
  console.log(`NFT名称: ${await contractNFT.name()}`);
  console.log(`NFT代号: ${await contractNFT.symbol()}`);
  let tx = await contractNFT.mint(account, tokenId, signature);
  console.log("铸造中，等待交易上链");
  await tx.wait();
  console.log(
    `mint成功，地址${account} 的NFT余额: ${await contractNFT.balanceOf(
      account
    )}\n`
  );
};
