<script setup>
import { ref, watch, watchEffect  } from 'vue';
import GameVisualRocket from './rocket/GameVisualRocket.vue';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { preparePlayersForRockets, isPlayerWinner } from '@/services/playground/game';
import { getFlyDuration } from '@/services/playground/rocket';
import { formatCurrency } from '@/utils/currency';

const props = defineProps({
    prizeSum: {
        type: Number,
        required: true
    },
    players: {
        type: Array,
        required: true,
        default: () => ([
            {
                address: '%address%',
                resultAmount: 0
            },
        ])
    },
    playersCount: {
        type: Number,
        default: 4
    }
});

const emit = defineEmits({
    'finish': null
});

const { address } = useWallet();

const isCurrentPlayer = playerAddress => {
    return playerAddress.toLowerCase() === address.value.toLowerCase();
};

const [rocketsFirstGroup, rocketsSecondGroup] = preparePlayersForRockets(
    props.players,
    address.value
);

const containerEl = ref(null);
const finishEl = ref(null);
const rocketsRefs = ref([]);
const visibleRockets = ref(0);

const animPromises = ref([]);

const startRocketsFly = () => {
    rocketsRefs.value.forEach((rocket, index) => {
        const offset = 70;
        const isLooser = !isPlayerWinner(props.players[index].resultAmount);

        let finalY;
        let flyDuration = getFlyDuration(isLooser);

        finalY = containerEl.value.offsetHeight - (rocketsRefs.value[0].rocketEl.offsetHeight + offset);

        if (isLooser) {
            finalY -= finishEl.value.offsetHeight + (window.innerWidth <= 767
                ? finishEl.value.offsetHeight * 2
                : (Math.random() > 0.5 ? finishEl.value.offsetHeight / 2 : finishEl.value.offsetHeight / 3)
            );
        }

        rocket.startFly(finalY, flyDuration).then(() => {
            if (isLooser) {
                animPromises.value.push(rocket.explode());
            } else {
                animPromises.value.push(rocket.finishRace(300));
            }
        });
    });
};

watch(visibleRockets, rockets => {
    if (rockets === props.playersCount) {
        startRocketsFly();
    }
});

watchEffect(async () => {
    if (animPromises.value.length === 4) {
        await Promise.all(animPromises.value);

        emit('finish');
    }
});
</script>

<template>
    <div
        ref="containerEl"
        :class="styles.container"
    >
      
        <div
            ref="finishEl"
            :class="styles.finish"
        >
            <Transition
                name="finish-text"
                appear
            >
                <div :class="styles.finishText">
                    Prize
                </div>
            </Transition>

            <Transition
                name="finish-prize"
                appear
            >
                <div :class="styles.finishPrize">
                    {{ formatCurrency(prizeSum) }}
                </div>
            </Transition>
        </div>

        <div :class="styles.rockets">

            <div :class="styles.rocketsCol">
                <GameVisualRocket
                    v-for="({ num, address: playerAddress }) in rocketsFirstGroup"
                    :key="playerAddress"
                    ref="rocketsRefs"
                    :num="num"
                    :address="playerAddress"
                    :current-player="isCurrentPlayer(playerAddress)"
                    :class="styles.rocket"
                    @after-appear="visibleRockets++"
                />
            </div>

            <div :class="styles.rocketsCol">
                <GameVisualRocket
                    v-for="({ num, address: playerAddress }) in rocketsSecondGroup"
                    :key="playerAddress"
                    ref="rocketsRefs"
                    :num="num"
                    :address="playerAddress"
                    :current-player="isCurrentPlayer(playerAddress)"
                    :class="styles.rocket"
                    @after-appear="visibleRockets++"
                />
            </div>
    
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './GameVisual.module.scss';
</style>

<style lang="scss">
.finish-text-enter,
.finish-prize-enter {
    &-from {
        opacity: 0;
        transform: translate(0, 30px);
    }

    &-to {
        opacity: 1;
        transform: translate(0, 0);
    }

    &-active {
        transition: transform 0.25s, opacity 0.2s;
    }
}

.finish-prize-enter {
    &-active {
        transition-delay: 0.15s;
    }
}
</style>