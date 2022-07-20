<script setup>
import AppContainer from '@/components/container/AppContainer.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import PlayButton from '@/components/play/PlayButton';

const steps = [
    {
        num: 1,
        key: 'first',
        title: 'Get ready',
        description: 'Choose a selection with a suitable bet for you, and wait for the rest of the players.',
    },
    {
        num: 2,
        key: 'second',
        title: 'Start',
        description: 'The game has begun. Watch your rocket, it must not crash. the players who reach the finish line are the winners.',
        inverse: true
    },
    {
        num: 3,
        key: 'third',
        title: 'The result of the game',
        description: 'The game is over, you can See your results and play again.',
    }
];

const getImageSrcSet = step => {
    return `/images/guide/${ step }.png 1x, /images/guide/${ step }@2x.png 2x, /images/guide/${ step }@3x.png 3x`;
};
</script>

<template>
    <div :class="styles.about">
        <div :class="[styles.gradient, styles.gradient1]" />
        <div :class="[styles.gradient, styles.gradient2]" />
        <div :class="[styles.gradient, styles.gradient3]" />

        <AppContainer>
            <div :class="styles.title">
                Welcome to<br /> Rocket alion!
            </div>

            <div :class="styles.list">
                <div
                    v-for="({ num, key, title, description, inverse }) in steps"
                    :key="key"
                    :class="[styles.card, {
                        [styles.inverse]: inverse
                    }]"
                >
                    <VIcon
                        name="guide-card-stroke-1"
                        :class="[styles.cardStroke, styles.cardStroke1]"
                    />
                    <VIcon
                        name="guide-card-stroke-2"
                        :class="[styles.cardStroke, styles.cardStroke2]"
                    />

                    <div :class="styles.cardWrap">
                        <div :class="styles.cardContent">
                            <div :class="styles.cardTitle">
                                <span>{{ num }}.</span> {{ title }}
                            </div>

                            <div :class="styles.cardDescription">
                                {{ description }}
                            </div>
                        </div>

                        <picture :class="styles.cardImage">
                            <source
                                media="(min-width: 1001px)"
                                :srcset="getImageSrcSet(key)"
                            />

                            <source
                                media="(max-width: 1000px)"
                                :srcset="getImageSrcSet(`${ key }-mobile`)"
                            />

                            <img
                                :src="`/images/guide/${ key }.png`"
                                :alt="title"
                            />
                        </picture>
                    </div>
                </div>
            </div>

            <div :class="styles.action">
                <PlayButton />
            </div>
        </AppContainer>
    </div>
</template>

<style lang="scss" module="styles">
@import './AboutSection.module.scss';
</style>