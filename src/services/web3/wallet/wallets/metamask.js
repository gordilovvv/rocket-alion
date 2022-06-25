import { connectWallet } from '../actions/connect';
import { METAMASK_ID } from '../ids';
import { ACTIVE_CHAIN_DATA } from '../chain';

const ethereum = window.ethereum;

function addBscChain() {
    return ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                ...ACTIVE_CHAIN_DATA
            }
        ]
    });
}

export const provider = ethereum;

export const isSupported = !!ethereum;

export async function connectMetamask() {
    try {
        const [ account ] = await ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (!account)
            throw new Error('Please login with metamask');

        await addBscChain();

        await connectWallet(ethereum, METAMASK_ID);
    } catch ({ message }) {
        // TODO: notification
        console.error(message);
    }
}