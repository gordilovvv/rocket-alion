import { useWalletState } from '../useState';

export async function logoutFromWallet() {
    const { web3, resetState } = useWalletState();

    try {
        if (web3.value.currentProvider?.disconnect) {
            await web3.value.currentProvider.disconnect();
        }

        resetState();
    } catch ({ message }) {
        console.error(message);
    }
}