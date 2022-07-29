import { useWalletState } from './useState';
import { openWalletConnectionPopup } from './popup/actions'; 

export function useWallet() {
    const { web3, address, balance, walletId, chainId, isConnected } = useWalletState();

    return {
        web3,
        walletId,
        chainId,
        address,
        balance,
        isConnected,
        openWalletConnectionPopup
    };
}