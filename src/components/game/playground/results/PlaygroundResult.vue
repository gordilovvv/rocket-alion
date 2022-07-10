<script setup>
import { computed, ref } from 'vue';
import PlaygroundResultPlayer from './player/PlaygroundResultPlayer.vue';
import VButton from '@/components/common/button/VButton.vue';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { startGame } from '@/services/playground/game';
import { ellipseAddress } from '@/utils/address';

const props = defineProps({
    game: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        required: true,
        default: () => ([
            {
                address: '%address%',
                resultAmount: 0
            }
        ])
    },
});

const { address } = useWallet();
const isLoadingRestart = ref(false);

const allPlayers = computed(() => {
    return props.players.map(({ address, resultAmount }) => ({
        address,
        resultAmount,
        looser: Math.sign(resultAmount) === -1 // if amount < 0
    }));
});

const isCurrentPlayerWinner = computed(() => {
    const looser = allPlayers.value.find(
        player => player.looser
    );

    return looser?.address !== address.value;
});

const title = computed(() => {
    return isCurrentPlayerWinner.value
        ? 'You win!'
        : 'You lose!';
});

const isCurrentPlayer = playerAddress => {
    return playerAddress === address.value;
};

const getPlayerText = playerAddress => {
    if (isCurrentPlayer(playerAddress))
        return 'You';

    return ellipseAddress(playerAddress);
};

const restart = async () => {
    isLoadingRestart.value = true;

    await startGame(props.game);

    isLoadingRestart.value = false;
};
</script>

<template>
    <div
        :class="[
            styles.results, {
                [styles.win]: isCurrentPlayerWinner,
                [styles.lose]: !isCurrentPlayerWinner
            }
        ]"
    >

        <div :class="styles.head">
            <div :class="styles.headImage" />

            <div :class="styles.headTitle">
                {{ title }}
            </div>
        </div>

        <div :class="styles.body">
            <div :class="styles.bodyTable">
                <PlaygroundResultPlayer
                    v-for="player in allPlayers"
                    :key="player.address"
                    :text="getPlayerText(player.address)"
                    :amount="player.resultAmount"
                    :winner="!player.looser"
                    :current-player="isCurrentPlayer(player.address)"
                />
            </div>

            <VButton
                block
                :loading="isLoadingRestart"
                @click="restart"
            >
                Restart
            </VButton>
        </div>

        <div :class="styles.hash">
            <div :class="styles.hashText">
                Round Hash:
            </div>
            
            <div :class="styles.hashValue">
                {{ hash }}
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './PlaygroundResults.module.scss';
</style>