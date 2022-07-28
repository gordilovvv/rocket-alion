import { shallowReactive, toRefs, watchEffect } from 'vue';
import { ls } from '@/utils/localStorage';
import Web3 from 'web3';

export const WALLET_STATE_LS = 'active-wallet';

const state = shallowReactive({
    web3: new Web3(),
    walletId: '',
    chainId: 0,
    address: '',
    balance: 0,
    isConnected: false
});

if (ls.has(WALLET_STATE_LS)) {
    const {
        walletId,
        chainId,
        address,
        balance,
        isConnected
    } = ls.get(WALLET_STATE_LS);

    state.walletId = walletId;
    state.chainId = chainId;
    state.address = address;
    state.balance = balance;
    state.isConnected = isConnected;
}

watchEffect(() => ls.set(WALLET_STATE_LS, {
    walletId: state.walletId,
    chainId: state.chainId,
    address: state.address,
    balance: state.balance,
    isConnected: state.isConnected
}));


// TODO: error
// let errorAlert;
// const { showAlert, hideAlert } = useAlert();

// watchEffect(() => {
//     if (state.chainId && state.chainId !== ACTIVE_CHAIN_ID) {
//         errorAlert = showAlert({
//             view: 'danger',
//             text: `App network (Ethereum) doesn't match to network selected in wallet (network with id: ${ state.chainId }).`,
//             autoClose: false
//         });
//     } else {
//         if (errorAlert) {
//             errorAlert = undefined;

//             hideAlert();
//         }
//     }
// });

export function useWalletState() {
    const resetState = () => {
        state.walletId = '';
        state.address = '';
        state.balance = 0;
        state.isConnected = false;
    };

    return {
        ...toRefs(state),
        resetState
    };
}