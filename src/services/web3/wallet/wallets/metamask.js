import { connectWallet } from '../actions/connect';
import { METAMASK_ID } from '../ids';

const ethereum = window.ethereum;

export const provider = ethereum;

export const isSupported = !!ethereum;

export async function connectMetamask() {
    try {
        const [ account ] = await ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (!account)
            throw new Error('Please login with metamask');

        await connectWallet(ethereum, METAMASK_ID);
    } catch ({ message }) {
        console.error(message);
    }
}