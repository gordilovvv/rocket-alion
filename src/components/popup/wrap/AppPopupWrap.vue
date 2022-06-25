<script setup>
defineProps({
    visible: Boolean
});

const emit = defineEmits({
    close: null,
    'after-leave': null
});
</script>

<template>
    <div :class="styles.wrap">

        <Transition
            appear
            name="overlay-appear"
        >
            <div
                v-if="visible"
                :class="styles.overlay"
                @click="emit('close')"
            />
        </Transition>

        <div :class="styles.content">
            <Transition
                appear
                name="popup-box"
                @after-leave="emit('after-leave')"
            >
                <div
                    v-if="visible"
                    :class="styles.box"
                >
                    <div :class="styles.boxContent">
                        <slot />
                    </div>
                </div>
            </Transition>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupWrap.scss';
</style>

<style lang="scss">
.overlay-appear-enter {
    &-from {
        opacity: 0;
        transform: translateZ(0);
    }

    &-to {
        opacity: 1;
        transform: translateZ(0);
    }

    &-active {
        transition: opacity 0.15s ease-in-out;
    }
}

.overlay-appear-leave {
    &-from {
        opacity: 1;
        transform: translateZ(0);
    }

    &-to {
        opacity: 0;
        transform: translateZ(0);
    }

    &-active {
        transition: opacity 0.15s ease-in-out;
    }
}

@include min768 {
   .popup-box-enter {
        &-from {
            opacity: 0;
            transform: scale(0.75);
        }

        &-to {
            opacity: 1;
            transform: scale(1);
        }

        &-active {
            transition: transform 0.2s ease-in-out, opacity 0.15s ease-in-out;
        }
    }

    .popup-box-leave {
        &-from {
            opacity: 1;
            transform: scale(1);
        }

        &-to {
            opacity: 0;
            transform: scale(1.15);
        }

        &-active {
            transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
        }
    }
}

@include max767 {
    .popup-box-enter {
        &-from {
            transform: translate(0, 100%);
        }

        &-to {
            transform: translate(0, 0);
        }

        &-active {
            transition: transform 0.35s cubic-bezier(0.46, 0.32, 0.2, 0.9);
        }
    }

    .popup-box-leave {
        &-from {
            transform: translate(0, 0);
        }

        &-to {
            transform: translate(0, 100%);
        }

        &-active {
            transition: transform .15s ease-in-out;
        }
    }
}
</style>