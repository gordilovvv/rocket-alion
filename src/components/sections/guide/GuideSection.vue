<script setup>
import AppContainer from '@/components/container/AppContainer.vue';

const cards = [
    {
        step: 1,
        text: 'Connect your wallet',
    },
    {
        step: 2,
        text: 'Top up your balance',
    },
    {
        step: 3,
        text: 'Choose the room',
    }
];

const getImageSrcSet = step => {
    return `/images/guide/${ step }.png 1x, /images/guide/${ step }@2x.png 2x`;
};
</script>

<template>
    <div
        id="guide"
        :class="styles.guide"
    >
        <AppContainer>
            
            <div :class="styles.title">
                How to use
            </div>

            <div :class="styles.list">
                <div
                    v-for="({ step, text }) in cards"
                    :key="step"
                    :class="styles.card"
                >
                    <div :class="styles.cardImage">
                        <img
                            :srcset="getImageSrcSet(step)"
                            alt="text"
                        />
                    </div>

                    <div :class="styles.cardStep">
                        Step {{ step }}
                    </div>

                    <div :class="styles.cardText">
                        {{ text }}
                    </div>
                </div>
            </div>

        </AppContainer>
    </div>
</template>

<style lang="scss" module="styles">
@import './GuideSection.module.scss';
</style>