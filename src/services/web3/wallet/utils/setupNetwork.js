import { BASE_BSC_SCAN_URLS, chainId } from "@/config";
import { BSC_RPC_URLS, BSC_TESTNET_RPC_URLS } from "@/config/constants/rpc";

const NETWORK_CONFIG = {
    [chainId.BSC]: {
        name: 'BNB Smart Chain Mainnet',
        scanURL: BASE_BSC_SCAN_URLS[chainId.BSC],
        rpcUrls: BSC_RPC_URLS,
    },
    [chainId.BSC_TESTNET]: {
        name: 'BNB Smart Chain Testnet',
        scanURL: BASE_BSC_SCAN_URLS[chainId.BSC_TESTNET],
        rpcUrls: BSC_TESTNET_RPC_URLS,
    },
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
*/
export async function setupNetwork(chainId, provider) {
    if (!NETWORK_CONFIG[chainId]) {
        console.error('Invalid chain id');

        return false;
    }

    if (provider) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
            return true;
        } catch (switchError) {
            if ((switchError)?.code === 4902) {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x${chainId.toString(16)}`,
                                chainName: NETWORK_CONFIG[chainId].name,
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'bnb',
                                    decimals: 18,
                                },
                                rpcUrls: NETWORK_CONFIG[chainId].rpcUrls,
                                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
                            },
                        ],
                    });
                    return true;
                } catch (error) {
                    console.error('Failed to setup the network in Metamask:', error);
                    return false;
                }
            }

            return false;
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
        return false;
    }
}