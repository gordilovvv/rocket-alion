<script setup>
import AlertNotification from '@/components/alert/AlertNotification.vue';
import TheHeader from '@/components/general/header/TheHeader.vue';
import WalletConnectPopup from '@/components/wallet/connect/popup/WalletConnectPopup.vue';
</script>

<template>
    <div :class="styles.wrapper">

        <TheHeader :class="styles.header" />

        <div :class="styles.content">
            <slot />
        </div>
        
    </div>

    <AlertNotification />
    <WalletConnectPopup />
</template>

<style lang="scss" module="styles">
@import './EmptyLayout.module.scss';
</style>