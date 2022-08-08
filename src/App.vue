<script setup>
import { computed, useCssModule } from 'vue';
import AlertNotification from './components/alert/AlertNotification.vue';
import WalletConnectPopup from './components/wallet/connect/popup/WalletConnectPopup.vue';
import GamePaymentPopup from './components/game/payment/GamePaymentPopup.vue';
import VSpin from './components/common/spin/VSpin.vue';
import { useRoute } from 'vue-router';
import { useSocketLoading } from '@/api/realtime/useSocketLoading';
import { LAYOUTS, DEFAULT_LAYOUT } from './layouts/layouts';
import { walletAutoConnect } from './services/web3/wallet/actions/autoConnect';
import { chainError } from '@/services/web3/wallet/utils/chainError';

const vars = useCssModule('vars');

document.body.classList.add(
    vars.colors,
    vars.decorations
);

const route = useRoute();
const layout = computed(() => {
    return LAYOUTS[route.meta.layout] || LAYOUTS[DEFAULT_LAYOUT];
});

const { isLoading } = useSocketLoading();

walletAutoConnect();
</script>

<template>
    <div
        v-if="isLoading"
        :class="styles.loader"
    >
        <VSpin />
    </div>
    <div
        v-else
        :class="styles.content"
    >
        <div
            v-if="chainError"
            :class="styles.error"
        >
            Please, change network in your wallet for playing the game. We support only BSC chain.
        </div>
        <Component :is="layout">

            <RouterView />

        </Component>

        <AlertNotification />
        <GamePaymentPopup />
        <WalletConnectPopup />
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>

<style lang="scss" module="styles">
.content,
.loader {
    display: flex;
    flex-flow: column;
    flex-grow: 1;
}
.loader {
    align-items: center;
    justify-content: center;
}

.error {
    width: 100%;
    text-align: center;
    font-family: var(--font-family-text);
    padding: 16px;
    font-size: 16px;
    border-radius: 0 0 16px 16px;
    background: rgba(209, 59, 68, 0.3);
    backdrop-filter: blur(30px);

    @include max767 {
        font-style: 14px;
    }
}
</style>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/colors.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>