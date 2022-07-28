import { useWalletState } from "../useState";
import { useWallet } from "../useWallet";

async function requestToBlockchain(web3, account) {
    try {
        const wei = await web3.value.eth.getBalance(account);
    
        return parseFloat(web3.value.utils.fromWei(
            wei,
            'ether'
        ));
    } catch (error) {
        console.log(error);

        return 0;
    }
}

export async function getBalance(account) {
    const { web3 } = useWalletState();

    const balance = await requestToBlockchain(
        web3,
        account
    );

    return balance;
}

export async function updateBalance() {
    const { balance, address } = useWallet();

    balance.value = await getBalance(address.value);
}