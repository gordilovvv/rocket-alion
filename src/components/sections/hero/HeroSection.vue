<script setup>
import AppContainer from '@/components/container/AppContainer.vue';
import PlayButton from '@/components/play/PlayButton';
import VIcon from '@/components/common/icon/VIcon.vue';
</script>

<template>
    <div :class="styles.hero">

        <div :class="styles.background">
            <div :class="[styles.stones, styles.stones1]" />
            <div :class="[styles.stones, styles.stones2]" />

            <div :class="styles.light" />

            <div :class="[styles.stones, styles.stones3]" />
            <div :class="[styles.stones, styles.stones4]" />

            <div :class="styles.planet" />

            <div :class="[styles.planetXs, styles.planetXs1]" />
            <div :class="[styles.planetXs, styles.planetXs2]" />
            <div :class="[styles.planetXs, styles.planetXs3]" />
            <div :class="[styles.planetXs, styles.planetXs4]" />

            <div :class="[styles.rocket, styles.rocket1]" />
            <div :class="[styles.rocket, styles.rocket2]" />
        </div>

        <div :class="styles.content">
            <AppContainer :class="styles.container">
                <div :class="styles.icon">
                    <VIcon name="rocket" />
                </div>

                <h1 :class="styles.title">Rocket alion</h1>
                <h3 :class="styles.description">p2e game with 75% chance of winning</h3>

                <PlayButton />
            </AppContainer>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './HeroSection.module.scss';
</style>