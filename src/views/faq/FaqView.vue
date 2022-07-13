<script setup>
import AppContainer from '@/components/general/container/AppContainer.vue';
import FaqCard from '@/components/faq/FaqCard.vue';

const ITEMS = [
    {
        title: 'What is Rocket Alion GAME?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
    {
        title: 'What blockchain platform does Rocket alion use?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
    {
        title: 'How to participate in Rocket alion?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
    {
        title: 'What blockchain platform does Rocket alion use?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
    {
        title: 'How to participate in Rocket alion?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
    {
        title: 'How to participate in Rocket alion?',
        content: 'ROcket alion is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.'
    },
];
</script>

<template>
    <AppContainer>

        <div :class="styles.title">
            Faq
        </div>

        <div :class="styles.list">
            <FaqCard
                v-for="({ title, content }, index) in ITEMS"
                :key="index"
            >
                <template #title>
                    {{ title }}
                </template>

                <template #content>
                    {{ content }}
                </template>
            </FaqCard>
        </div>

    </AppContainer>
</template>

<style lang="scss" module="styles">
@import './FaqView.module.scss';
</style>