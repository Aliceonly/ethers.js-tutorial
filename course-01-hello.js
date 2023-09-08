import { ethers } from 'ethers';

const provider = ethers.getDefaultProvider();

const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`V神的账户余额:${ethers.utils.formatEther(balance)}`);
}

main();