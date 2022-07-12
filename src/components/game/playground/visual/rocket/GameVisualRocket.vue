<script setup>
import { useCssModule, computed, ref, onUnmounted } from 'vue';
import RocketTrail from './trail/RocketTrail';
import VIcon from '@/components/common/icon/VIcon.vue';
import { COLORS, ROCKET_TRAIL_HEIGHT, rocketAnimation } from '@/services/playground/rocket';
import { ellipseAddress } from '@/utils/address';

const props = defineProps({
    num: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    currentPlayer: Boolean
});

const emit = defineEmits({
    'after-appear': null
});

const styles = useCssModule('styles');
const ACTIVE_COLOR = COLORS[props.num];

const looser = ref(false);
const rocketEl = ref(null);
const rocketTrailEl = ref(null);
const transitionDelay = ref(props.num * 0.2);

const labelClasses = computed(() => {
    return [styles.label, {
        [styles.current]: props.currentPlayer && !looser.value,
        [styles.lose]: looser.value
    }];
});

const labelStyles = computed(() => {
    if (props.currentPlayer)
        return null;

    const { text, fill } = ACTIVE_COLOR;

    return {
        color: text,
        backgroundColor: fill
    };
});

const labelText = computed(() => {
    return props.currentPlayer
        ? 'You'
        : ellipseAddress(props.address);
});

const anim = rocketAnimation();

onUnmounted(() => anim.destroy());

const afterAppear = () => {
    emit('after-appear');

    transitionDelay.value = 0;
};

const startFly = (y, duration) => anim.flyTo(
    rocketEl.value,
    y,
    duration
);

const explode = () => {
    looser.value = true;
    
    return anim.hideRocketTrail(
        rocketTrailEl.value,
        ROCKET_TRAIL_HEIGHT,
    );
};

const finishRace = duration => anim.hideRocketTrail(
    rocketTrailEl.value,
    ROCKET_TRAIL_HEIGHT,
    duration
);

defineExpose({
    rocketEl,
    startFly,
    explode,
    finishRace
});
</script>

<template>
    <Transition
        name="rocket-appear"
        appear
        @after-appear="afterAppear"
    >
        <div
            ref="rocketEl"
            :class="[styles.rocket, styles[`rocket${ num }`]]"
            :style="`transition-delay: ${ transitionDelay }s`"
        >
            <Transition name="scull-appear">
                <div
                    v-if="looser"
                    :class="styles.scull"
                >
                    <VIcon
                        name="scull"
                        :class="styles.scullIcon"
                    />
                    <VIcon
                        name="rectangle"
                        :class="styles.scullRectangle"
                    />
                </div>
            </Transition>

            <div
                :class="labelClasses"
                :style="labelStyles"
            >
                <div :class="styles.labelText">
                    {{ labelText }}
                </div>
            </div>

            <RocketTrail
                ref="rocketTrailEl"
                :color="ACTIVE_COLOR.trail"
                :height="ROCKET_TRAIL_HEIGHT"
                :class="styles.trail"
            />
        
            <Transition name="rocket-explosion">
                <div
                    v-if="looser"
                    :class="styles.explosion"
                />

                <div
                    v-else
                    :class="styles.image"
                />
            </Transition>
        </div>
    </Transition>
</template>

<style lang="scss" module="styles">
@import './GameVisualRocket.module.scss';
</style>

<style lang="scss">
.rocket-explosion-leave {
    &-from {
        opacity: 1;
        transform: scale(1);
    }

    &-to {
        opacity: 0;
        transform: scale(1.2);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.15s linear;
    }
}

.scull-appear-enter {
    &-from {
        opacity: 0;
        transform: translate(-50%, -15px);
    }

    &-to {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.15s linear;
    }
}

.rocket-appear-enter {
    &-from {
        transform: scale(0)
    }

    &-to {
        transform: scale(1)
    }

    &-active {
        transition: transform 0.3s;
    }
}
</style>