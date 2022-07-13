<script>
import { useGameStore } from '@/stores/game'; 
import { useAlert } from '@/services/alert/useAlert';
import { computed } from '@vue/reactivity';
import { useRoomsStore } from '@/stores/rooms';
import { preloadAllGameImages } from '@/services/playground/game';
import { unsubscribeFromGame } from '@/api/realtime/subscribers/game';

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
    },
    beforeRouteLeave() {
        const answer = window.confirm(
            'Do you really want to leave? You’re already in game!'
        );

        if (!answer)
            return false;
    }
};
</script>

<script setup>
import { onUnmounted, ref, watchEffect } from 'vue';
import GameVisual from '@/components/game/playground/visual/GameVisual.vue';
import PlaygroundContainer from '@/components/game/playground/container/PlaygroundContainer.vue';
import PlaygroundLobby from '@/components/game/playground/lobby/PlaygroundLobby.vue';
import PlaygroundResult from '@/components/game/playground/results/PlaygroundResult.vue';

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

onUnmounted(unsubscribeFromGame);
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
            @finish="activeStage = STAGE_RESULTS" 
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