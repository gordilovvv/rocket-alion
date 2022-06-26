<script setup>
import { onUnmounted, ref, watch, nextTick, watchEffect } from 'vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useRoute } from 'vue-router';
import { useScrollLock } from '@/utils/hooks/useScrollLock'

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits({
    'update:visible': null,
    'toggle-settings': null
});

const route = useRoute();

const menu = ref(null);

const close = () => emit('update:visible', false);

const { disableBodyScroll, enableBodyScroll } = useScrollLock();

watch(route, () => close());

watchEffect(() => {
    if (props.visible) {
        nextTick(() => disableBodyScroll(menu));
    } else {
        enableBodyScroll(menu);
    }
});

onUnmounted(() => enableBodyScroll(menu));
</script>

<template>
    <Teleport to="body">
        <Transition
            name="menu-appear"
            duration="150"
        >
            <div
                v-if="visible"
                ref="menu"
                :class="styles.menu"
            >

                <div :class="styles.box">
                    <div :class="styles.content">
                        
                        <div :class="styles.head">
                            <RouterLink
                                to="/"
                                :class="styles.logo"
                            >
                                <img
                                    src="/images/logo.png"
                                    alt=""
                                    :class="styles.logoImage"
                                />

                                <span :class="styles.logoText">
                                    Rocket Alion
                                </span>
                            </RouterLink>

                            <button
                                :class="styles.close"
                                @click="close"
                            >
                                <VIcon name="close" />
                            </button>
                        </div>

                        <div :class="styles.body">
                            <slot
                                name="menu"
                                :link-class="styles.link"
                                :active-class="styles.active"
                            />
                        </div>
                        
                    </div>
                </div>

            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" module="styles">
@import './MobileMenu.module.scss';
</style>

<style lang="scss">
.menu-appear-enter {
    &-from {
        transform: translate(100%, 0);
    }

    &-to {
        transform: translate(0, 0);
    }

    &-active {
       transition: transform 0.3s cubic-bezier(0.46, 0.32, 0.2, 0.9);
    }
}

.menu-appear-leave {
    &-from {
        transform: translate(0, 0);
    }

    &-to {
        transform: translate(100%, 0);
    }

    &-active {
        transition: transform 0.2s ease-in-out;
    }
}
</style>