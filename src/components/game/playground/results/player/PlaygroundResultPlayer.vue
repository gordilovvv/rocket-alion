<script setup>
import { computed } from 'vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { formatCurrency } from '@/utils/currency';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    winner: Boolean,
    currentPlayer: Boolean
});

const icon = computed(() => {
    return props.winner
        ? 'cup'
        : 'scull';
});

const amount = computed(() => {
    return `${ props.amount > 0 ? '+' : '' }${ formatCurrency(props.amount) }`;
});
</script>

<template>
    <div
        :class="[
            styles.player,
            {
                [styles.winner]: winner,
                [styles.looser]: !winner,
                [styles.current]: currentPlayer
            }
        ]"
    >
        <div :class="styles.icon">
            <VIcon :name="icon" />
        </div>

        <div :class="styles.text">
            {{ text }}
        </div>

        <div :class="styles.amount">
            {{ amount }}
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './PlaygroundResultPlayer.module.scss';
</style>