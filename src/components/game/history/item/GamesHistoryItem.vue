<script setup>
import { computed } from 'vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { timestampToDate, timestampToTime } from '@/utils/date'
import { shortAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/currency';
import ChainIcon from '@/components/general/chain/ChainIcon.vue';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    betAmount: {
        type: Number,
        required: true
    },
    winningAmount: {
        type: Number,
        required: true
    },
    chain: {
        type: String,
        default: 'default'
    },
    timestamp: {
        type: Number,
        required: true
    }
});

const checkUrl = computed(() => {
    return `/check?game=${ props.id }`; 
});

const shortWallet = computed(() => {
    return shortAddress(props.wallet);
});

const gameDate = computed(() => {
    return timestampToDate(props.timestamp);
})

const gameTime = computed(() => {
    return timestampToTime(props.timestamp);
});
</script>

<template>
    <div :class="styles.game">

        <div :class="styles.id">
            <RouterLink
                :to="checkUrl"
                :class="styles.idLink"
            >
                <div :class="styles.idNumber">
                    {{ id }}
                </div>

                <div :class="styles.idIcon">
                    <VIcon name="shield" />
                </div>
            </RouterLink>
        </div>

        <div :class="styles.wallet">
            {{ shortWallet }}
        </div>

        <div :class="styles.amount">
            <div :class="styles.amountContent">
                <ChainIcon :class="styles.amountChain" />

                <div :class="styles.amountText">
                    {{ formatCurrency(winningAmount) }}
                </div>
            </div>
        </div>

        <div :class="styles.bet">
            {{ formatCurrency(betAmount) }}
        </div>

        <div :class="styles.date">
            {{ gameDate }}
        </div>

        <div :class="styles.time">
            {{ gameTime }}
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './GamesHistoryItem.module.scss';
</style>