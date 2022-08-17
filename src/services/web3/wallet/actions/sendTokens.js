import { useWallet } from "../useWallet";
import Web3 from "web3";

export function sendTokens(amount, to, onSuccess, onError) {
    const { address, web3 } = useWallet();

    const transaction = {
        to,
        from: address.value,
        value: Web3.utils.toWei(amount.toString(), 'ether')
    };

    let hash;

    const onSendTx = (error, txHash) => {
        if (error)
            return onError(error);

        hash = txHash;
    };

    web3.value.eth.sendTransaction(
        transaction,
        onSendTx
    ).once(
        'confirmation',
        () => onSuccess(hash)
    );
}