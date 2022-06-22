<script setup>
import TheHeader from '@/components/general/header/TheHeader.vue';
</script>

<template>
    <div :class="styles.gradient" />

    <div :class="styles.wrapper">

        <TheHeader />

        <div :class="styles.content">
            <slot />
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './DefaultLayout.module.scss';
</style>