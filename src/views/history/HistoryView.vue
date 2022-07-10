<script setup>
import AppContainer from '@/components/general/container/AppContainer.vue';
import StatisticCard from '@/components/statistic/card/StatisticCard.vue';
import { formatCurrency } from '@/utils/currency';
import { computed } from '@vue/reactivity';
import GamesHistory from '@/components/game/history/GamesHistory.vue';

// TODO:
// 1. real data
// 2. load more button
// 3. status field in game history
const totalWon = computed(() => {
    return formatCurrency(3.1255232215512);
});

const gamesWon = 6;
const gamesLose = 6;

const allGames = [];
</script>

<template>
    <AppContainer>

        <div :class="styles.statistic">
            <StatisticCard
                gold
                icon="bank"
            >
                <template #label>
                    Total bnb won
                </template>
                <template #value>
                    {{ totalWon }}
                </template>
            </StatisticCard>

            <StatisticCard icon="prize">
                <template #label>
                    Games won
                </template>
                <template #value>
                    {{ gamesWon }}
                </template>
            </StatisticCard>

            <StatisticCard icon="scull">
                <template #label>
                    Games lose
                </template>
                <template #value>
                    {{ gamesLose }}
                </template>
            </StatisticCard>
        </div>

        <div :class="styles.title">
            Last games
        </div>

        <GamesHistory :games="allGames" />

    </AppContainer>
</template>

<style lang="scss" module="styles">
@import './HistoryView.module.scss';
</style>