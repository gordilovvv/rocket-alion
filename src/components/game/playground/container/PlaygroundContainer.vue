<script setup>
import AppContainer from '@/components/general/container/AppContainer.vue';
import VIcon from '@/components/common/icon/VIcon.vue';

defineProps({
    blur: Boolean
});
</script>

<template>
    <AppContainer
        full-width
        :class="styles.appContainer"
    >
        <div :class="styles.container">
            <div :class="styles.wrap">
                
                <div
                    :class="[
                        styles.background,
                        { [styles.blur]: blur }
                    ]"
                >
                    <div :class="styles.clouds">
                        <VIcon name="clouds" />
                    </div>

                    <div :class="[styles.planet, styles.planetBig]" />

                    <div :class="[styles.planet, styles.planetSmall]" />

                    <div :class="styles.stones" />

                    <div :class="styles.earth" />
                </div>

                <div :class="styles.content">
                    <slot />
                </div>
                
            </div>
        </div>
    </AppContainer>
</template>

<style lang="scss" module="styles">
@import './PlaygroundContainer.module.scss';
</style>