<script setup>
import { useAlert } from '@/services/alert/useAlert';

const { alert } = useAlert();
</script>

<template>
    <Teleport to="#alerts">
        <Transition
            name="alert-appear"
        >
            <div
                v-if="alert.isVisible"
                :key="alert.id"
                :class="[styles.alert, styles[alert.view]]"
            >
                <div
                    v-if="alert.text"
                    :class="styles.text"
                >
                    {{ alert.text }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" module="styles">
@import './AlertNotification.module.scss';
</style>

<style lang="scss">
.alert-appear-enter {
    &-from {
        opacity: 0;
        transform: translate(-50%, -30px);
    }

    &-to {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    &-active {
        transition: opacity 0.15s linear, transform 0.15s ease-in-out;
    }
}
</style>