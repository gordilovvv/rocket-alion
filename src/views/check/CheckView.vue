<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
    <div>
        check game {{ route.query.game }}
    </div>
</template>

<style lang="scss" module="styles">
@import './CheckView.module.scss';
</style>