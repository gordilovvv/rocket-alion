import Web3 from 'web3';

import { useWalletState } from '../useState';
import { ACTIVE_CHAIN_ID } from '../chain';

import { logoutFromWallet } from './logout';
import { getBalance } from '../utils/getBalance';

import { closeWalletConnectionPopup } from '../popup/actions';
import { isWalletConnectionPopupOpened } from '../popup/state';

export async function connectWallet(provider, id) {
    const {
        web3,
        walletId,
        address,
        balance,
        isConnected,
    } = useWalletState();

    web3.value = new Web3(provider);

    const [ account ] = await web3.value.eth.getAccounts();

    // if no account - user is not logged!
    if (!account)
        return logoutFromWallet();

    const ether = await getBalance(account);

    walletId.value = id;
    address.value = account;
    balance.value = ether;
    isConnected.value = true;

    subscribeOnProviderEvents(provider);

    if (isWalletConnectionPopupOpened) {
        closeWalletConnectionPopup();
    }
}

function subscribeOnProviderEvents(provider) {
    provider?.on('disconnect', () => logoutFromWallet());

    provider?.on('accountsChanged', async ([ account ]) => {
        // If no account its meaning that wallet is disconnect
        if (!account) {
            alert('Metamask was disconnected');

            return logoutFromWallet();
        }

        const { address, balance } = useWalletState();

        address.value = account;
        balance.value = await getBalance();
    });

    provider?.on('chainChanged', async chainId => {
        if (chainId === ACTIVE_CHAIN_ID)
            return;

        // TODO: error
        console.error(`${ chainId } - is unsupported chain!`);
    });
  
    // TODO: check this
    // provider.on("networkChanged", async (networkId: number) => {
    //     const { web3 } = this.state;
    //     const chainId = await web3.eth.chainId();
    //     await this.setState({ chainId, networkId });
    //     await this.getAccountAssets();
    // });
}