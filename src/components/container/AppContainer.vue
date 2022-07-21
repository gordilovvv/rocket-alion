<script setup>
import { computed, useCssModule } from 'vue';

const props = defineProps({
    fullWidth: Boolean
});

const styles = useCssModule('styles');

const containerClasses = computed(() => {
    return [styles.container, {
        [styles.full]: props.fullWidth
    }];
});
</script>

<template>
    <div :class="containerClasses">
    
        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './AppContainer.module.scss';
</style>