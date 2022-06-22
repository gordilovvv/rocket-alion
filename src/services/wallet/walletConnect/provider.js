import WalletConnectProvider from '@walletconnect/web3-provider';

const provider = new WalletConnectProvider({
    infuraId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    // rpc: {
    //     1: 'https://bsc-dataseed1.binance.org:443'
    // }
});

export default provider;