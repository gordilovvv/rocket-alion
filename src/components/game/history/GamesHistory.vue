<script setup>
import { reactive, ref } from 'vue';
import GamesHistoryItem from './item/GamesHistoryItem.vue';
import GameHistoryPopup from './popup/GameHistoryPopup.vue';
import VSpin from '@/components/common/spin/VSpin.vue';

defineProps({
    games: {
        type: Array,
        default: () => ([])
    },
    loading: Boolean
});

const isResultsVisible = ref(false);
const selectedResultsData = reactive({
    txs: [],
    winningAmount: 0
});

const openResults = (txs, winningAmount) => {
    isResultsVisible.value = true;

    selectedResultsData.txs = txs;
    selectedResultsData.winningAmount = winningAmount;
};
</script>

<template>
    <div :class="styles.table">

        <div :class="styles.head">
            <div :class="styles.col">
                Game ID
            </div>

            <div :class="[styles.col, styles.amount]">
                Prize
            </div>

            <div :class="[styles.col, styles.bet]">
                Bet
            </div>

            <div :class="[styles.col, styles.date]">
                Date
            </div>
        </div>

        <div
            :class="[
                styles.body,
                { [styles.loading]: loading }
            ]"
        >
            <VSpin
                v-if="loading"
                :class="styles.spin"
            />

            <div v-else-if="games.length">
                <GamesHistoryItem
                    v-for="({ id, betAmount, winningAmount, txs, timestamp }) in games"
                    :id="id"
                    :key="id"
                    :bet-amount="betAmount"
                    :winning-amount="winningAmount"
                    :timestamp="timestamp"
                    @show-results="openResults(txs, winningAmount)"
                />
            </div>

            <div
                v-else
                :class="styles.placeholder"
            >
                <div :class="styles.placeholderText">
                    Nothing was found
                </div>
            </div>
        </div>

        <GameHistoryPopup
            v-model:visible="isResultsVisible"
            :txs="selectedResultsData.txs"
            :winning-amount="selectedResultsData.winningAmount"
        />

    </div>
</template>

<style lang="scss" module="styles">
@import './GamesHistory.module.scss';
</style>