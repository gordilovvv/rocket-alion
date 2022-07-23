<script>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game'; 
import { useRoomsStore } from '@/stores/rooms';
import { useAlert } from '@/services/alert/useAlert';

export default {
    beforeRouteEnter() {
        const { game } = useGameStore();
        const { showAlert } = useAlert();

        if (!game) {
            showAlert({
                view: 'danger',
                text: `You are not in the game!`
            });

            return '/';
        }
    }
};
</script>

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import GameVisual from '@/components/game/playground/visual/GameVisual.vue';
import PlaygroundContainer from '@/components/game/playground/container/PlaygroundContainer.vue';
import PlaygroundLobby from '@/components/game/playground/lobby/PlaygroundLobby.vue';
import PlaygroundResult from '@/components/game/playground/results/PlaygroundResult.vue';
import { useRouter } from 'vue-router';
import { autoConnectToGame } from '@/services/playground/game';
import { synchronizeGameStorage, resetGameStorage } from '@/services/playground/storage';

// TODO: preload all images
const activeStage = ref();

const STAGE_LOBBY = 'lobby';
const STAGE_VISUAL = 'visual';
const STAGE_RESULTS = 'results';

const gameStore = useGameStore();
const { rooms } = useRoomsStore();
const activeRoom = rooms[gameStore.game.id];

watchEffect(() => {
    if (gameStore.game.players[0]?.resultAmount === undefined) {
        activeStage.value = STAGE_LOBBY;
    } else {
        activeStage.value = STAGE_VISUAL;
    }
});

const lobby = computed(() => {
    const {
        name: title,
        playersCapacity,
        bet,
        prize
    } = activeRoom;

    const players = gameStore.game.players.map(
        player => ({ ...player, bet })
    );

    const bankSum = players.length * bet;
    const prizeSum = prize;

    return {
        title,
        bankSum,
        prizeSum,
        players,
        playersCapacity
    };
});

const blurPlayground = computed(() => {
    return [
        STAGE_LOBBY,
        STAGE_RESULTS
    ].includes(activeStage.value);
});

const router = useRouter();

const autoConnect = async () => autoConnectToGame(gameStore.game.id, () => {
    router.push('/');
    resetGameStorage();
});

const showResults = () => {
    activeStage.value = STAGE_RESULTS;

    resetGameStorage();
};

onMounted(() => {
    synchronizeGameStorage(gameStore);

    autoConnect();
});

onUnmounted(() => {
    resetGameStorage();
});
</script>

<template>
    <PlaygroundContainer :blur="blurPlayground">

        <!-- Lobby -->
        <PlaygroundLobby
            v-if="activeStage === STAGE_LOBBY"
            v-bind="lobby"
        />
        
        <!-- Visual Part -->
        <GameVisual
            v-else-if="activeStage === STAGE_VISUAL"
            :prize-sum="activeRoom.prize"
            :players="gameStore.game.players"
            @finish="showResults" 
        />

        <!-- Result -->
        <PlaygroundResult
            v-else
            :game-id="gameStore.game.id"
            :players="gameStore.game.players"
        />

    </PlaygroundContainer>
</template>

<style lang="scss" module="styles">
@import './GameView.module.scss';
</style>