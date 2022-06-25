<script setup>
import { computed, useCssModule } from 'vue';
import { METAMASK_ID, WALLET_CONNECT_ID } from '@/services/web3/wallet/ids';

const props = defineProps({
    wallet: {
        type: String,
        required: true,
        validator(wallet) {
            return [METAMASK_ID, WALLET_CONNECT_ID].includes(wallet);
        }
    },
    disabled: Boolean
})

const emit = defineEmits({
    click: null
})

const icon = computed(() => {
    return `./images/wallets/${ props.wallet }.png`;
})

const styles = useCssModule('styles');

const classes = computed(() => {
    return [styles.button, styles[props.wallet], {
        [styles.disabled]: props.disabled
    }];
})
</script>

<template>
    <button
        type="button"
        :class="classes"
        @click="emit('click')"
    >
    
        <span :class="styles.icon">
            <img
                :src="icon"
                alt=""
            />
        </span>

        <span :class="styles.text">
            <slot />
        </span>
           
    </button>
</template>

<style lang="scss" module="styles">
@import './WalletConnectButton.module.scss';
</style>