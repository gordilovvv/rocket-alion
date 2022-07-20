<script setup>
import { computed, useCssModule } from 'vue';
import { walletAutoConnect } from './services/web3/wallet/actions/autoConnect';
import { LAYOUTS, DEFAULT_LAYOUT } from './layouts/layouts';
import { useRoute } from 'vue-router';
import { messages } from './api/realtime/realtime';
import AlertNotification from './components/alert/AlertNotification.vue';
import WalletConnectPopup from './components/wallet/connect/popup/WalletConnectPopup.vue';
import GamePaymentPopup from './components/game/payment/GamePaymentPopup.vue';

const vars = useCssModule('vars');

document.body.classList.add(
    vars.colors,
    vars.decorations
);

const route = useRoute();
const layout = computed(() => {
    return LAYOUTS[route.meta.layout] || LAYOUTS[DEFAULT_LAYOUT];
});

walletAutoConnect();
</script>

<template>
    <Component :is="layout">
        <Teleport to="#app">
            <div style="position:fixed;bottom: 0;left:0right:0;background-color: rgba(0,0,0,0.5);z-index: 10000;">
                {{ messages }}
            </div>
        </Teleport>

        <RouterView />

    </Component>

    <AlertNotification />
    <GamePaymentPopup />
    <WalletConnectPopup />
</template>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/colors.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>