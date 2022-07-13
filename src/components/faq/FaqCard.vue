<script setup>
import { ref, computed, useCssModule } from 'vue';
import VIcon from '../common/icon/VIcon.vue';

const isOpen = ref(false);


const styles = useCssModule('styles');

const cardStyles = computed(() => {
    return [styles.card, {
        [styles.opened]: isOpen.value
    }];
});

const icon = computed(() => {
    return isOpen.value
        ? 'minus'
        : 'plus';
});

const toggle = () => isOpen.value = !isOpen.value;
</script>

<template>
    <div :class="cardStyles">
        <div :class="styles.title">
            <slot name="title" />
        </div>

        <div
            v-if="isOpen"
            :class="styles.content"
        >
            <slot name="content" />
        </div>

        <button
            :class="styles.button"
            @click="toggle"
        >
            <Transition
                name="faq-item-icon"
                mode="out-in"
            >
                <VIcon
                    :key="icon"
                    :name="icon"
                /> 
            </Transition>
        </button>
    </div>
</template>

<style lang="scss" module="styles">
@import './FaqCard.module.scss';
</style>

<style lang="scss">
.faq-item-icon-enter {
    &-from {
        transform: scale(0);
    }

    &-to {
        transform: scale(1);
    }

    &-active {
        transition: transform 0.15s;
    }
}
</style>