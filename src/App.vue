<script setup>
import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import { useCssModule } from 'vue';
import { walletAutoConnect } from './services/web3/wallet/actions/autoConnect';

const vars = useCssModule('vars');

document.body.classList.add(
    vars.colors,
    vars.decorations
);

walletAutoConnect();
</script>

<template>
    <DefaultLayout>

        <RouterView />

    </DefaultLayout>
</template>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/colors.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>