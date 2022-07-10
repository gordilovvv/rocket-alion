<script setup>
import VIcon from '@/components/common/icon/VIcon.vue';

defineProps({
    icon: {
        type: String,
        default: ''
    },
    gold: Boolean
});
</script>

<template>
    <div
        :class="[styles.card, {
            [styles.gold]: gold
        }]"
    >

        <div :class="styles.label">
            <slot name="label" />
        </div>

        <div :class="styles.value">
            <slot name="value" />
        </div>

        <div :class="styles.icon">
            <VIcon :name="icon" />
        </div>
    
    </div>
</template>

<style lang="scss" module="styles">
@import './StatisticCard.module.scss';
</style>