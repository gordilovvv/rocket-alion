const BscMainnet = {
    id: 56,
    rpc: 'https://bsc-dataseed1.binance.org/',
    data() {
        return {
            chainId: `0x${ Number(this.id).toString(16) }`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
                name: 'Binance Chain Native Token',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: [
                'https://bsc-dataseed1.binance.org',
                'https://bsc-dataseed2.binance.org',
                'https://bsc-dataseed3.binance.org',
                'https://bsc-dataseed4.binance.org',
                'https://bsc-dataseed1.defibit.io',
                'https://bsc-dataseed2.defibit.io',
                'https://bsc-dataseed3.defibit.io',
                'https://bsc-dataseed4.defibit.io',
                'https://bsc-dataseed1.ninicoin.io',
                'https://bsc-dataseed2.ninicoin.io',
                'https://bsc-dataseed3.ninicoin.io',
                'https://bsc-dataseed4.ninicoin.io',
                'wss://bsc-ws-node.nariox.org'
            ],
            blockExplorerUrls: [
                'https://bscscan.com'
            ]
        };
    }
};

const BscTestnet = {
    id: 97,
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    data() {
        return {
            chainId: `0x${ Number(this.id).toString(16) }`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
                name: 'Binance Chain Native Token',
                symbol: 'tBNB',
                decimals: 18
            },
            rpcUrls: [
                this.rpc
            ],
            blockExplorerUrls: [
                'https://testnet.bscscan.com/'
            ]
        };
    }
};

const ACTIVE_CHAIN = import.meta.env.VITE_CHAIN_MAINNET === '1'
    ? BscMainnet
    : BscTestnet;

// Binance Smart Chain ID
export const ACTIVE_CHAIN_ID = ACTIVE_CHAIN.id;

// Binance Smart Chain RPC URL
export const ACTIVE_CHAIN_RPC = ACTIVE_CHAIN.rpc;
 
// Binance Smart Chain METAMASK DATA
export const ACTIVE_CHAIN_DATA = ACTIVE_CHAIN.data();

export async function addActiveChainRequest(provider) {
    return provider?.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                ...ACTIVE_CHAIN_DATA
            }
        ]
    });
}