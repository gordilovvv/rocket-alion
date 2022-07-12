import { useWallet } from "../useWallet";
import Web3 from "web3";

export async function sendTokens(amount, to) {
    const { address, web3 } = useWallet();

    const weiAmount = Web3.utils.toWei(amount.toString(), 'ether');

    const tx = await web3.value.eth.sendTransaction({
        to,
        from: address.value,
        value: weiAmount
    });

    return tx;
}