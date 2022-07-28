import Web3 from 'web3';
import { useWalletState } from '../useState';
import { logoutFromWallet } from './logout';
import { getBalance } from '../utils/getBalance';
import { closeWalletConnectionPopup } from '../popup/actions';
import { isWalletConnectionPopupOpened } from '../popup/state';

export async function connectWallet(provider, id) {
    const {
        web3,
        walletId,
        chainId,
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
    const chain = await web3.value.eth.getChainId();

    walletId.value = id;
    chainId.value = chain;
    address.value = account;
    balance.value = ether;
    isConnected.value = true;

    subscribeOnProviderEvents(provider, chainId);

    if (isWalletConnectionPopupOpened) {
        closeWalletConnectionPopup();
    }
}

function subscribeOnProviderEvents(provider, chainId) {
    if (!provider.on)
        return;

    provider.on('disconnect', () => logoutFromWallet());

    provider.on('accountsChanged', async ([ account ]) => {
        // If no account its meaning that wallet is disconnect
        if (!account) {
            alert('Metamask was disconnected');

            return logoutFromWallet();
        }

        const { address, balance } = useWalletState();

        address.value = account;
        balance.value = await getBalance(account);
    });

    provider.on('chainChanged', async id => {
        chainId.value = id;
    });
}