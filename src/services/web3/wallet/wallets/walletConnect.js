import WalletConnectProvider from '@walletconnect/web3-provider';
import { connectWallet } from '../actions/connect';
import { WALLET_CONNECT_ID } from '../ids';
import { ACTIVE_CHAIN_ID, ACTIVE_CHAIN_RPC, addActiveChainRequest } from '../chain';

let shouldForceModalOpen = false;

export const provider = new WalletConnectProvider({
    infuraId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    chainId: ACTIVE_CHAIN_ID,
    rpc: {
        [ACTIVE_CHAIN_ID]: ACTIVE_CHAIN_RPC,
    }
});

// fix for open qrcode modal again
provider.wc.on(
    'modal_closed',
    () => shouldForceModalOpen = true
);

export async function connectWalletConnect() {
    try {
        if (shouldForceModalOpen) {
            provider.qrcodeModal.open(
                provider.connector.uri,
                { bridge: provider.bridge }
            );
        }

        await provider.enable();
        await addActiveChainRequest(provider);

        connectWallet(provider, WALLET_CONNECT_ID);
    } catch ({ message }) {
        console.error(message);
    }
}