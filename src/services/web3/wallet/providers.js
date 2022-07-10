import { METAMASK_ID, WALLET_CONNECT_ID } from './ids';
import { provider as metamaskProvider } from './wallets/metamask';
import { provider as walletConnectProvider } from './wallets/walletConnect';

export const WALLETS_PROVIDERS = {
    [METAMASK_ID]: metamaskProvider,
    [WALLET_CONNECT_ID]: walletConnectProvider
};