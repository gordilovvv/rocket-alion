import Web3 from 'web3'
import provider from './provider'

export async function useWalletConnect() {
    await provider.enable();
    
    const web3 = new Web3(provider);

    const chain = web3.eth.getChainId();

    console.log(chain);
}