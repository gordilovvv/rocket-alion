<script setup>
import VIcon from '@/components/common/icon/VIcon.vue'

const emit = defineEmits({
    close: null
})
</script>

<template>
    <div :class="styles.head">

        <div :class="styles.title">
            <slot />
        </div>

        <button
            :class="styles.button"
            @click="emit('close')"
        >
            <VIcon name="close" />
        </button>

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupHead.module.scss';
</style>