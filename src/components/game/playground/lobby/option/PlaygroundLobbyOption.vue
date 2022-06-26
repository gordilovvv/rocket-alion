<script setup>
import VIcon from '@/components/common/icon/VIcon.vue';

defineProps({
    icon: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div :class="styles.option">
        <div :class="styles.icon">
            <VIcon :name="icon" />
        </div>

        <div :class="styles.content">
            <div :class="styles.text">
                <slot name="text" />
            </div>

            <div :class="styles.number">
                <slot name="number" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './PlaygroundLobbyOption.module.scss';
</style>