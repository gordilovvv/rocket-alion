<script setup>
import AppContainer from '../container/AppContainer.vue';
import VButton from '../common/button/VButton.vue';
import config from '@/config';
// import scrollToElement from 'scroll-to-element';
// import { onMounted, onUnmounted } from 'vue';

const menuLinks = [
    { text: 'About', section: '#about' },
    { text: 'Safety', section: '#safety' },
    { text: 'How to use', section: '#guide' },
];

const scrollTo = section => {
    let node = document.querySelector(section);

    if (node) {
        node.scrollIntoView({
            behavior: 'smooth'
        });
    }

    node = undefined;
};

// const scrollTo = sectionId => scrollToElement(sectionId, {
//     offset: -120,
//     duration: 1500
// });

// onMounted(() => {

// });

// onUnmounted(() => {

// });
</script>

<template>
    <header :class="styles.header">
        <AppContainer
            full-width
            :class="styles.wrap"
        >

            <div :class="styles.left">
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

                <div :class="styles.menu">
                    <button
                        v-for="({ text, section }) in menuLinks"
                        :key="section"
                        :href="section"
                        :class="styles.menuLink"
                        @click="scrollTo(section)"
                    >
                        {{ text }}
                    </button>
                </div>
            </div>

            <VButton
                :href="config.appUrl"
                :class="styles.button"
            >
                launch game
            </VButton>

        </AppContainer>
    </header>
</template>

<style lang="scss" module="styles">
@import './TheHeader.module.scss';
</style>