import { useWalletState } from './useState';

export function useWallet() {
    const { web3, address, balance, walletId, isConnected } = useWalletState();

    return {
        web3,
        walletId,
        address,
        balance,
        isConnected
    };
}