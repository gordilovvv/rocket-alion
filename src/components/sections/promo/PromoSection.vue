<script setup>
import VButton from '@/components/common/button/VButton.vue';
import config from '@/config';
</script>

<template>
    <div :class="styles.promo">
        <div :class="styles.background">
            <div :class="styles.backgroundImage" />
        </div>

        <div :class="styles.content">
            <div :class="styles.title">
                Play rocket alion now and win!
            </div>
        
            <VButton
                :href="config.appUrl"
                :class="styles.button"
            >
                PLAY NOW!
            </VButton>
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './PromoSection.module.scss';
</style>