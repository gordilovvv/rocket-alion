<script setup>
import { ellipseAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/currency';
import { computed } from 'vue';
import { useWallet } from '@/services/web3/wallet/useWallet';
import VSpin from '@/components/common/spin/VSpin.vue';

const props = defineProps({
    address: {
        type: [String, null],
        default: null
    },
    bet: {
        type: [Number, null],
        default: null
    },
    loading: Boolean
})

const { address } = useWallet();

const isYou = computed(() => {
    return address.value === props.address;
})

const text = computed(() => {
    if (props.loading)
        return null;

    return isYou.value
        ? 'You'
        : ellipseAddress(props.address);
})

const bet = computed(() => {
    return props.loading
        ? null
        : formatCurrency(props.bet);
})
</script>

<template>
    <div
        :class="[
            styles.player,
            { [styles.active]: isYou }
        ]"
    >

        <VSpin
            v-if="loading"
            :class="styles.spin"
        />
        
        <template v-else>
            <div :class="styles.text">
                {{ text }}
            </div>

            <div :class="styles.bet">
                {{ bet }}
            </div>
        </template>

    </div>
</template>

<style lang="scss" module="styles">
@import './PlaygroundLobbyPlayer.module.scss';
</style>