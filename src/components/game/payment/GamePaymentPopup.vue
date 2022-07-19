<script setup>
import { onUnmounted, ref, watchEffect, computed } from 'vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import VButton from '@/components/common/button/VButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import VSpin from '@/components/common/spin/VSpin.vue';
import { gamePaymentState, useGamePayment } from '@/services/playground/transaction/payment';

const isOpen = computed(
    () => gamePaymentState.starting || gamePaymentState.loading || gamePaymentState.error
);

const text = computed(() => {
    if (gamePaymentState.loading)
        return 'Blockchain transaction confirmations... Please wait.';

    if (gamePaymentState.error)
        return 'Error creating transaction, please try again.';

    return `Space Pilgrim, the game begins${ loadingDots.value }`;
});

const { reset } = useGamePayment();

let interval;
const loadingDots = ref('');

const DOTS_UPDATE_INTERVAL = 400;

watchEffect(() => {
    if (gamePaymentState.starting) {
        interval = setInterval(() => {
            loadingDots.value = loadingDots.value.length === 3
                ? ''
                : `${ loadingDots.value }.`;
        }, DOTS_UPDATE_INTERVAL);
    } else {
        if (interval) {
            clearInterval(interval);
            interval = null;
        } 
    }
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
    <AppPopup
        :model-value="isOpen"
        hide-header
        close-disabled
    >
        <div
            v-if="gamePaymentState.error"
            :class="styles.warning"
        >
            <VIcon name="warning" />
        </div>

        <div :class="styles.text">
            {{ text }}
        </div>

        <div
            v-if="gamePaymentState.loading"
            :class="styles.loading"
        >
            <VSpin :class="styles.loadingSpin" />
        </div>

        <div
            v-else-if="gamePaymentState.error"
            :class="styles.buttonWrap"
        >
            <VButton
                :class="styles.button"
                @click="reset"
            >
                Ok
            </VButton>
        </div>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './GamePaymentPopup.module.scss';
</style>