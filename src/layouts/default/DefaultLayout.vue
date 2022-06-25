<script setup>
import TheHeader from '@/components/general/header/TheHeader.vue';
import WalletConnectPopup from '@/components/wallet/connect/popup/WalletConnectPopup.vue';
</script>

<template>
    <div :class="styles.gradient" />

    <div :class="styles.wrapper">

        <TheHeader />

        <div :class="styles.content">
            <slot />
        </div>
        
    </div>

    <WalletConnectPopup />
</template>

<style lang="scss" module="styles">
@import './DefaultLayout.module.scss';
</style>