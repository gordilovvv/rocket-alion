<script setup>
import ChainIcon from '@/components/general/chain/ChainIcon.vue'
import VIcon from '@/components/common/icon/VIcon.vue'
import { ellipseAddress } from '@/utils/address'
import { formatCurrency } from '@/utils/currency'
import { useWallet } from '@/services/web3/wallet/useWallet'
import { openWalletConnectionPopup } from '@/services/web3/wallet/popup/actions'

const { address, balance, isConnected } = useWallet();
</script>

<template>
    <div
        v-if="isConnected"
        :class="styles.wallet"
    >
        <ChainIcon :class="styles.walletChain" />

        <div :class="styles.walletBalance">
            {{ formatCurrency(balance) }}
        </div>

        <div :class="styles.walletAddress">
            {{ ellipseAddress(address) }}
        </div>
    </div>

    <button
        v-else
        :class="styles.button"
        @click="openWalletConnectionPopup"
    >
        <span :class="styles.buttonIcon">
            <VIcon name="wallet" />
        </span>

        <span :class="styles.buttonText">
            Connect wallet
        </span>
    </button>
</template>

<style lang="scss" module="styles">
@import './WalletButton.module.scss';
</style>