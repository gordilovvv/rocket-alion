import { shallowReactive, toRefs, watchEffect } from 'vue';
import { ls } from '@/utils/localStorage';

export const WALLET_STATE_LS = 'active-wallet';

const state = shallowReactive({
    web3: null,
    walletId: '',
    address: '',
    balance: 0,
    isConnected: false
});

if (ls.has(WALLET_STATE_LS)) {
    const {
        walletId,
        address,
        balance,
        isConnected
    } = ls.get(WALLET_STATE_LS);

    state.walletId = walletId;
    state.address = address;
    state.balance = balance;
    state.isConnected = isConnected;
}

watchEffect(() => ls.set(WALLET_STATE_LS, {
    walletId: state.walletId,
    address: state.address,
    balance: state.balance,
    isConnected: state.isConnected
}));

export function useWalletState() {
    const resetState = () => {
        state.walletId = '';
        state.address = '';
        state.balance = 0;
        state.isConnected = false;
    }

    return {
        ...toRefs(state),
        resetState
    };
}