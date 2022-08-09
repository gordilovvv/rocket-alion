import Web3 from 'web3';
import { useWalletState } from '../useState';
import { setupNetwork } from '../utils/setupNetwork';
import { logoutFromWallet } from './logout';
import { getBalance, updateBalance } from '../utils/getBalance';
import { closeWalletConnectionPopup } from '../popup/actions';
import { isWalletConnectionPopupOpened } from '../popup/state';
import { ACTIVE_CHAIN_ID, chainId } from '@/config';
import { useAlert } from '@/services/alert/useAlert';

const SUPPORTED_CHAINS = [
    chainId.BSC,
    chainId.BSC_TESTNET
];

export async function connectWallet(provider, id) {
    const { showAlert } = useAlert();

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

    if (!SUPPORTED_CHAINS.includes(chain)) {
        const hasSetup = await setupNetwork(ACTIVE_CHAIN_ID, provider);

        if (!hasSetup)
            return showAlert({
                view: 'danger',
                text: 'Something was failed on connect. Please try again.'
            });
    }

    walletId.value = id;
    chainId.value = chain;
    address.value = account;
    balance.value = ether;
    isConnected.value = true;

    subscribeOnProviderEvents(provider);

    if (isWalletConnectionPopupOpened) {
        closeWalletConnectionPopup();
    }
}

function subscribeOnProviderEvents(provider) {
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
        const { chainId } = useWalletState();

        chainId.value = parseInt(id);
        updateBalance();
    });
}