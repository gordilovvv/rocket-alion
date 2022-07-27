<script setup>
import { computed } from 'vue';
import ChainIcon from '@/components/general/chain/ChainIcon.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { timestampToDate, timestampToTime } from '@/utils/date';
import { formatCurrency } from '@/utils/currency';
import { ellipseAddress } from '@/utils/address';

const props = defineProps({
    id: {
        type: [String, Number],
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
    timestamp: {
        type: [Number, String],
        required: true
    }
});

const shortId = computed(() => {
    return ellipseAddress(props.id);
});

const gameDate = computed(() => {
    return timestampToDate(props.timestamp);
});

const gameTime = computed(() => {
    return timestampToTime(props.timestamp);
});
</script>

<template>
    <div :class="styles.game">

        <div :class="styles.id">
            <div :class="styles.idWrap">
                <div :class="styles.idNumber">
                    {{ shortId }}
                </div>

                <div :class="styles.idIcon">
                    <VIcon name="shield" />
                </div>
            </div>
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