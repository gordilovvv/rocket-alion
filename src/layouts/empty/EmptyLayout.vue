<script setup>
import TheHeader from '@/components/general/header/TheHeader.vue';
</script>

<template>
    <div :class="styles.wrapper">

        <TheHeader :class="styles.header" />

        <div :class="styles.content">
            <slot />
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './EmptyLayout.module.scss';
</style>