
export const BASE_URL = 'https://app.rocketalion.com';
export const SOCKET_URL = 'https://api.rocketalion.com';

export const chainId = {
    BSC: 56,
    BSC_TESTNET: 97
};

export const BASE_BSC_SCAN_URLS = {
    [chainId.BSC]: 'https://bscscan.com',
    [chainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
};

export const ACTIVE_CHAIN_ID = chainId.BSC;