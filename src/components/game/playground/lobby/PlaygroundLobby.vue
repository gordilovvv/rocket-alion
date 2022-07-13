<script setup>
import { computed } from 'vue';
import PlaygroundLobbyOption from './option/PlaygroundLobbyOption.vue';
import { countPlayersPercent, getAllPlayersItems } from '@/services/playground/lobby';
import { formatCurrency } from '@/utils/currency';
import PlaygroundLobbyPlayer from './player/PlaygroundLobbyPlayer.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        required: true,
        default: () => ([])
    },
    playersCapacity: {
        type: Number,
        required: true
    },
    bankSum: {
        type: Number,
        required: true
    },
    prizeSum: {
        type: Number,
        required: true
    }
});

const allPlayers = computed(() => {
    return getAllPlayersItems(props.players, props.playersCapacity);
});

const progressCount = computed(() => {
    return `${ props.players.length }/${ props.playersCapacity }`;
});

const progressLineStyles = computed(() => {
    const percent = countPlayersPercent(props.players.length, props.playersCapacity);

    return { width: `${ percent }%` };
});
</script>

<template>
    <div :class="styles.lobby">

        <div :class="styles.lobbyHead">
            <div :class="styles.title">
                {{ title }}
            </div>

            <div :class="styles.description">
                Waiting for players
            </div>

            <div :class="styles.progress">
                <div :class="styles.progressCount">
                    {{ progressCount }}
                </div>

                <div :class="styles.progressBar">
                    <div
                        :class="styles.progressLine"
                        :style="progressLineStyles"
                    />
                </div>
            </div>
        </div>

        <div :class="styles.lobbyMain">
            <div :class="styles.players">
                <PlaygroundLobbyPlayer
                    v-for="player in allPlayers"
                    :key="player.address"
                    v-bind="player"
                />
            </div>
        </div>

        <div :class="styles.lobbySide">
            <PlaygroundLobbyOption icon="bank">
                <template #text>
                    Bank
                </template>
                <template #number>
                    {{ formatCurrency(bankSum) }}
                </template>
            </PlaygroundLobbyOption>

            <PlaygroundLobbyOption icon="players">
                <template #text>
                    Players
                </template>
                <template #number>
                    {{ playersCapacity }}
                </template>
            </PlaygroundLobbyOption>

            <PlaygroundLobbyOption icon="prize">
                <template #text>
                    Prize sum
                </template>
                <template #number>
                    {{ formatCurrency(prizeSum) }}
                </template>
            </PlaygroundLobbyOption>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './PlaygroundLobby.module.scss';
</style>