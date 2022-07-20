<script setup>
import AppContainer from '@/components/container/AppContainer.vue';
import VIcon from '@/components/common/icon/VIcon.vue';

const cards = [
    {
        icon:'blockchain',
        text: 'Web 3.0 authority.'
    },
    {
        icon:'wallet',
        text: 'All deposits saves on wallets of the players.'
    },
    {
        icon:'safe',
        text: 'Win goes to the wallet of the player directly.'
    },
];
</script>

<template>
    <div :class="styles.safety">
        <AppContainer>

            <div :class="styles.title">
                safety
            </div>

            <div :class="styles.list">
                <div
                    v-for="({ icon, text }) in cards"
                    :key="icon"
                    :class="styles.card"
                >
                    <VIcon
                        name="safety-card-stroke-left"
                        :class="[styles.cardStroke, styles.cardStrokeLeft]"
                    />
                    <VIcon
                        name="safety-card-stroke-right"
                        :class="[styles.cardStroke, styles.cardStrokeRight]"
                    />

                    <div :class="styles.cardContent">
                        <div :class="styles.cardIcon">
                            <VIcon name="blockchain" />
                        </div>

                        <div :class="styles.cardText">
                            {{ text }}
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    </div>
</template>

<style lang="scss" module="styles">
@import './SafetySection.module.scss';
</style>