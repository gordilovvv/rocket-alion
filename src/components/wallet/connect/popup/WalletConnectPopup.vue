<script setup>
import { ref } from 'vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import WalletConnectButton from '../button/WalletConnectButton.vue';
import { connectMetamask, isSupported } from '@/services/web3/wallet/wallets/metamask';
import { connectWalletConnect } from '@/services/web3/wallet/wallets/walletConnect';
import { isWalletConnectionPopupOpened } from '@/services/web3/wallet/popup/state';
import { METAMASK_ID, WALLET_CONNECT_ID } from '@/services/web3/wallet/ids';
import { BASE_URL } from '@/config';
import { isMobile } from '@/utils/mobile';

const isMetamaskLoading = ref(false);

const connectToMetamask = async () => {
    isMetamaskLoading.value = true;

    await connectMetamask();

    isMetamaskLoading.value = false;
};

const getMetamaskDappUrl = () => {
    const dappUrl = BASE_URL.slice(8);

    return `https://metamask.app.link/dapp/${ dappUrl }`;
};

const isWalletConnectLoading = ref(false);

const connectToWalletConnect = async () => {
    isWalletConnectLoading.value = true;

    await connectWalletConnect();

    isWalletConnectLoading.value = false;
};
</script>

<template>
    <AppPopup
        v-model="isWalletConnectionPopupOpened"
        title="Choose your wallet"
    >
        <WalletConnectButton
            v-if="isMobile()"
            :wallet="METAMASK_ID"
            :href="getMetamaskDappUrl()"
        >
            Metamask
        </WalletConnectButton>
        <WalletConnectButton
            v-else-if="isSupported"
            :wallet="METAMASK_ID"
            :disabled="isMetamaskLoading"
            @click="connectToMetamask"
        >
            Metamask
        </WalletConnectButton>

        <WalletConnectButton
            :wallet="WALLET_CONNECT_ID"
            :disabled="isWalletConnectLoading"
            @click="connectToWalletConnect"
        >
            Mobile wallet
        </WalletConnectButton>
    </AppPopup>
</template>