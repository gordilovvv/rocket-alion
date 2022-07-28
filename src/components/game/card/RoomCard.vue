<script setup>
import { computed, ref, useCssModule } from 'vue';
import VButton from '@/components/common/button/VButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useRouter } from 'vue-router';
import { useWallet } from '@/services/web3/wallet/useWallet';
import { useGameStore } from '@/stores/game';
import { startGame } from '@/services/playground/game';
import { formatCurrency } from '@/utils/currency';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bet: {
        type: Number,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    chance: {
        type: Number,
        required: true
    },
    best: Boolean
});

const styles = useCssModule('styles');

const cardClasses = computed(() => {
    return [styles.card, {
        [styles.default]: !props.best,
        [styles.best]: props.best
    }];
});

const percent = computed(() => {
    return `${ props.chance }%`;
});

const rocketSrcset = computed(() => {
    return `/images/rooms/${ props.id }.png 1x, /images/rooms/${ props.id }@2x.png 2x`;
});

const gameStore = useGameStore();
const isCurrentGameStarting = ref(false);

const isButtonLoading = computed(() => {
    return isCurrentGameStarting.value;
});

const isButtonDisabled = computed(() => {
    return !isButtonLoading.value && gameStore.isGameStarting;
});

const { isConnected } = useWallet();

const buttonText = computed(() => {
    return isConnected.value
        ? 'Play'
        : 'Connect wallet';
});

const router = useRouter();

const play = () => startGame(props.id, {
    onStart: () => router.push('/game'),
    onLoad: () => isCurrentGameStarting.value = true,
    onLoadEnd: () => isCurrentGameStarting.value = false
});
</script>

<template>
    <div :class="cardClasses">
        <div :class="styles.content">

            <div :class="styles.image">
                <template v-if="best">
                    <VIcon
                        :class="[styles.corner, styles.left]"
                        name="gold-corner"
                    />
                    <VIcon
                        :class="[styles.corner, styles.right]"
                        name="gold-corner"
                    />
                </template>

                <img
                    :class="styles.rocket"
                    :srcset="rocketSrcset"
                />
            </div>

            <div :class="styles.name">
                "{{ name }}"
            </div>

            <div :class="styles.bet">
                <span>{{ formatCurrency(bet) }}</span>
            </div>

            <div :class="styles.options">
                <div>Prize sum: {{ formatCurrency(prize) }}</div>
                <div>Winning chance: {{ percent }}</div>
            </div>

            <VButton
                block
                :loading="isButtonLoading"
                :disabled="isButtonDisabled"
                @click="play"
            >
                {{ buttonText }}
            </VButton>

        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './RoomCard.module.scss';
</style>