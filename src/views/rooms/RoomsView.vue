<script setup>
import { useRecentWinnings } from '@/api/realtime/suscribers/winnings';
import RoomCard from '@/components/game/card/RoomCard.vue';
import AppContainer from '@/components/general/container/AppContainer.vue';
import GamesHistory from '@/components/game/history/GamesHistory.vue';

const rooms = [
    {
        id: 'rookie',
        name: 'Rookie',
        bet: 0.1,
        prize: 0.12,
        chance: 75,
        best: false
    },
    {
        id: 'hunter',
        name: 'Bounty hunter',
        bet: 0.5,
        prize: 0.6,
        chance: 75,
        best: false
    },
    {
        id: 'king',
        name: 'King',
        bet: 1,
        prize: 1.2,
        chance: 75,
        best: true
    }
]

const { winnings, isLoading } = useRecentWinnings();
</script>

<template>
    <AppContainer>
        <div :class="styles.rooms">
            <RoomCard
                v-for="room in rooms"
                :key="room.id"
                v-bind="room"
            />
        </div>

        <div :class="styles.title">
            Recent wins
        </div>

        <GamesHistory
            :games="winnings"
            :loading="isLoading"
        />

    </AppContainer>
</template>

<style lang="scss" module="styles">
@import './RoomsView.module.scss';
</style>