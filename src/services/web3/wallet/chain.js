// Binance Smart Chain ID
export const ACTIVE_CHAIN_ID = 56;

// Binance Smart Chain RPC URL
export const ACTIVE_CHAIN_RPC = 'https://bsc-dataseed1.binance.org/';

// Binance Smart Chain METAMASK DATA
export const ACTIVE_CHAIN_DATA = {
    chainId: `0x${ Number(ACTIVE_CHAIN_ID).toString(16) }`,
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
}