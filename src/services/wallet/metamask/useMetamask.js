import { onBeforeMount, reactive, toRefs } from 'vue'
import Web3 from 'web3'

// TODO: get from api
const BSC_CHAIN = {
    chainId: `0x${ Number(56).toString(16) }`,
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

const state = reactive({
    address: '',
    balance: 0,
    isConnected: false,
    isSupported: false
});

// TODO: mobile connect
// https://docs.metamask.io/guide/mobile-best-practices.html#the-provider-window-ethereum
export function useMetamask() {
    let ethereum = window.ethereum;
    let web3;
    // const web3 = new Web3(ethereum);

    ethereum.on('chainChanged', chainId => {
        if (chainId === BSC_CHAIN.chainId)
            return;

        // TODO: app error
        console.error("App network (BNB Chain) doesn't match to network selected in wallet (network with id: 42220).");
    });

    const addChain = () => ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                ...BSC_CHAIN
            }
        ]
    });

    const getBalance = async () => {
        const value = await web3.eth.getBalance(state.address);

        const ether = web3.utils.fromWei(value, 'ether');

        return parseFloat(ether);
    }

    const connectWallet = async () => {
        try {
            if (!state.isSupported)
                throw new Error('Metamask is not installed!');

            const [ account ] = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (!account)
                throw new Error('Please login with metamask');

            await addChain();

            state.address = account;
            state.balance = await getBalance();
            state.isConnected = true;
        } catch ({ message }) {
            // TODO: notification
            console.error(message);
        }
    };

    const handleEthereum = () => {
        // fix for mobile phones
        return new Promise(r => {
            const resolve = () => {
                ethereum = window.ethereum;

                r();
            }

            window.addEventListener('ethereum#initialized', resolve, { once: true });
            
            setTimeout(resolve, 3000);
        });
    }

    const handleWeb3 = () => {
        web3 = new Web3(ethereum);
    }

    onBeforeMount(async () => {
        if (ethereum === undefined) {
            await handleEthereum();
        }

        handleWeb3();

        state.isSupported = ethereum !== undefined;
        
        if (!state.isSupported || state.address)
            return;

        const [ account ] = await web3.eth.getAccounts();

        if (account) {
            state.address = account;
            state.balance = await getBalance();
            state.isConnected = true;

            await addChain();
        }
    });

    return {
        ...toRefs(state),
        connectWallet
    }
}