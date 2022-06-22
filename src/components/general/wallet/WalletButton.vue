<script setup>
import ChainIcon from '@/components/general/chain/ChainIcon.vue'
import VIcon from '@/components/common/icon/VIcon.vue'
import { useMetamask } from '@/services/wallet/metamask/useMetamask'
import { shortAddress } from '@/utils/address'
import { formatCurrency } from '@/utils/currency'

const { address, balance, isSupported, connectWallet } = useMetamask();
</script>

<template>
    <div
        v-if="address"
        :class="styles.wallet"
    >
        <ChainIcon :class="styles.walletChain" />

        <div :class="styles.walletBalance">
            {{ formatCurrency(balance) }}
        </div>

        <div :class="styles.walletAddress">
            {{ shortAddress(address) }}
        </div>
    </div>

    <button
        v-else-if="isSupported"
        :class="styles.button"
        @click="connectWallet"
    >
        <span :class="styles.buttonIcon">
            <VIcon name="wallet" />
        </span>

        <span :class="styles.buttonText">
            Connect wallet
        </span>
    </button>

    <a
        v-else
        href="https://metamask.io/"
        rel="nofollow noreferrer"
        target="_blank"
        :class="styles.button"
    >
        <span :class="styles.buttonIcon">
            <VIcon name="wallet" />
        </span>

        <span :class="styles.buttonText">
            Install Metamask
        </span>
    </a>
</template>

<style lang="scss" module="styles">
@import './WalletButton.module.scss';
</style>