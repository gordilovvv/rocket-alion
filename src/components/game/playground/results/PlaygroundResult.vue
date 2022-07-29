<script setup>
import { computed, onMounted, ref, useCssModule } from 'vue';
import PlaygroundResultPlayer from './player/PlaygroundResultPlayer.vue';
import VButton from '@/components/common/button/VButton.vue';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { startGame } from '@/services/playground/game';
import { ellipseAddress } from '@/utils/address';
import { updateBalance } from '@/services/web3/wallet/utils/getBalance';

const props = defineProps({
    gameId: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        default: ''
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

const styles = useCssModule('styles');

const resultClasses = computed(() => {
    return [styles.results, {
        [styles.win]: isCurrentPlayerWinner.value,
        [styles.lose]: !isCurrentPlayerWinner.value
    }];
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

onMounted(updateBalance);

const restart = () => startGame(props.gameId, {
    onLoad: () => isLoadingRestart.value = true,
    onLoadEnd: () => isLoadingRestart.value = false
});
</script>

<template>
    <div :class="resultClasses">

        <div :class="styles.head">
            <Transition
                name="result-image"
                appear
            >
                <div :class="styles.headImage" />
            </Transition>

            <Transition
                name="result-title"
                appear
            >
                <div :class="styles.headTitle">
                    {{ title }}
                </div>
            </Transition>
        </div>

        <Transition
            name="result-content"
            appear
        >
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
        </Transition>

        <div
            v-if="hash"
            :class="styles.hash"
        >
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

<style lang="scss">
.result-title-enter {
    &-from {
        opacity: 0;
        transform: translate(0, 30px);
    }

    &-to {
        opacity: 1;
        transform: translate(0, 0);
    }

    &-active {
        transition: transform 0.25s, opacity 0.15s;
        transition-delay: 0.15s;
    }
}

.result-image-enter {
    &-from {
        transform: scale(0);
    }

    &-to {
        transform: scale(1);
    }

    &-active {
        transition: transform 0.3s ease-out;
        transition-delay: 0.3s;
    }
}
</style>