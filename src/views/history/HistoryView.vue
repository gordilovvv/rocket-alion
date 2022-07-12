<script setup>
import { computed } from '@vue/reactivity';
import AppContainer from '@/components/general/container/AppContainer.vue';
import GamesHistory from '@/components/game/history/GamesHistory.vue';
import StatisticCard from '@/components/statistic/card/StatisticCard.vue';
import VSpin from '@/components/common/spin/VSpin.vue';
import { usePlayerStatistic } from '@/api/realtime/repositories/statistic';
import { formatCurrency } from '@/utils/currency';

// TODO:
// 2. load more button
// 3. status field in game history
const {
    stats,
    gamesHistory,
    isLoadingStats,
    isLoadingHistory
} = usePlayerStatistic();

const totalWon = computed(() => {
    return formatCurrency(stats.totalWon);
});
</script>

<template>
    <AppContainer>

        <div
            v-if="isLoadingStats"
            :class="styles.loading"
        >
            <VSpin :class="styles.loadingSpin" />
        </div>

        <div
            v-else
            :class="styles.statistic"
        >
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
                    {{ stats.gamesWon }}
                </template>
            </StatisticCard>

            <StatisticCard icon="scull">
                <template #label>
                    Games lose
                </template>
                <template #value>
                    {{ stats.gamesLose }}
                </template>
            </StatisticCard>
        </div>

        <div :class="styles.title">
            Last games
        </div>

        <GamesHistory
            :games="gamesHistory"
            :loading="isLoadingHistory"
        />

    </AppContainer>
</template>

<style lang="scss" module="styles">
@import './HistoryView.module.scss';
</style>