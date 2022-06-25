import { unref } from 'vue';
import { useWalletState } from '../useState';

import { connectWallet } from './connect';
import { logoutFromWallet } from './logout';

import { WALLET_CONNECT_ID } from '../ids';
import { WALLETS_PROVIDERS } from '../providers';

// this function return provider based on wallet id
function getProvider(walletId) {
    const provider = WALLETS_PROVIDERS[walletId];

    if (!provider) {
        console.error('Unknown wallet id!');

        return null;
    }

    return provider;
}

// this function uses in top of app for auto-connect
export function walletAutoConnect() {
    const { walletId, isConnected } = useWalletState();

    if (!isConnected.value)
        return;

    const wallet = unref(walletId);
    const provider = getProvider(wallet);

    if (!wallet)
        return;

    if (provider) {
        if (wallet === WALLET_CONNECT_ID)
            provider.enable(); // if walletConnect provider - should enable provider

        connectWallet(provider, wallet);
    } else {
        logoutFromWallet();
    }
}