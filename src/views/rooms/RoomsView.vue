<script setup>
import { computed, watch } from 'vue';
import RoomCard from '@/components/game/card/RoomCard.vue';
import AppContainer from '@/components/general/container/AppContainer.vue';
import GamesHistory from '@/components/game/history/GamesHistory.vue';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { useRoomsStore } from '@/stores/rooms';
import { useRecentWinnings } from '@/api/realtime/subscribers/winnings';
import { getRooms } from '@/api/realtime/repositories/rooms';

const roomsStore = useRoomsStore();

const rooms = computed(() => {
    return Object.entries(roomsStore.rooms).map(
        ([id, game]) => ({ id, ...game })
    );
});

const { address, isConnected } = useWallet();
const { winnings, isLoading } = useRecentWinnings();

// watch for address and connected. On change - update rooms data
watch([address, isConnected], async ([ account, connected ]) => {
    if (account && connected || !account && !connected) {
        roomsStore.rooms = await getRooms();
    }
});
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