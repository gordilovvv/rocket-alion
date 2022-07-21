<script setup>
import { useCssModule } from 'vue';
import TheHeader from './components/header/TheHeader.vue';

const vars = useCssModule('vars');

document.body.classList.add(
    vars.colors,
    vars.decorations
);
</script>

<template>
    <div :class="styles.wrapper">
    
        <TheHeader />
        
        <div :class="styles.content">
            <RouterView />
        </div>
        
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>

<style lang="scss" module="styles">
@import './App.module.scss';
</style>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/colors.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>