import { useWalletState } from "../useState";

export async function getBalance(account) {
    const { web3 } = useWalletState();

    let balance = 0;

    try {
        const wei = await web3.value.eth.getBalance(account);
    
        balance = parseFloat(web3.value.utils.fromWei(
            wei,
            'ether'
        ));
    } catch ({ message }) {
        console.error(message);
    }

    return balance;
}