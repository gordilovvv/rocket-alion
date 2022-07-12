<script setup>
import { computed, useCssModule } from 'vue';
import { walletAutoConnect } from './services/web3/wallet/actions/autoConnect';
import { LAYOUTS, DEFAULT_LAYOUT } from './layouts/layouts';
import { useRoute } from 'vue-router';

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

        <RouterView />

    </Component>
</template>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/colors.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>