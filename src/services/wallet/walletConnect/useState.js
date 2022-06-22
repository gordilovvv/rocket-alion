import { reactive, watch } from 'vue'

const defaultState = {
    address: '',
    chain: '',
    connected: false
}

const LS_WALLET_CONNECT_NAME = 'walletConnectState';

const getDefaultState = () => {
    if (localStorage.getItem(LS_WALLET_CONNECT_NAME) !== null) {
        return JSON.parse(localStorage.getItem(LS_WALLET_CONNECT_NAME));
    }

    return defaultState;
}

const state = reactive(getDefaultState());

watch(
    state,
    () => {
        localStorage.setItem(LS_WALLET_CONNECT_NAME, JSON.stringify(state));
    },
    { deep: true }
)

export function useConnect() {
    if (localStorage.getItem(LS_WALLET_CONNECT_NAME) === null) {
        localStorage.setItem(LS_WALLET_CONNECT_NAME, JSON.stringify(state));
    }

    return { state };
}