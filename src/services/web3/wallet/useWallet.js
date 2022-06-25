import { useWalletState } from './useState';
import { openWalletConnectionPopup } from './popup/actions'; 

export function useWallet() {
    const { web3, address, balance, walletId, isConnected } = useWalletState();

    return {
        web3,
        walletId,
        address,
        balance,
        isConnected,
        openWalletConnectionPopup
    };
}