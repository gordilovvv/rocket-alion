<script setup>
import GamesHistoryItem from './item/GamesHistoryItem.vue';
import VSpin from '@/components/common/spin/VSpin.vue';

defineProps({
    games: {
        type: Array,
        default: () => ([])
    },
    loading: Boolean
})
</script>

<template>
    <div :class="styles.table">

        <div :class="styles.head">
            <div :class="styles.col">
                Game ID
            </div>

            <div :class="[styles.col, styles.wallet]">
                Winner's wallet
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

            <div v-else>
                <GamesHistoryItem
                    v-for="game in games"
                    :key="game.id"
                    v-bind="game"
                />
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './GamesHistory.module.scss';
</style>