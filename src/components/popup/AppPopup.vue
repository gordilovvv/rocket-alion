<script setup>
import { ref, toRef, watchEffect } from 'vue'
import { usePopupEscClose } from './hooks/usePopupEscClose';
import AppPopupWrap from './wrap/AppPopupWrap.vue'
import AppPopupHead from './head/AppPopupHead.vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    modelValue: Boolean,
});

const emit = defineEmits({
    'update:modelValue': null
});

const isOpen = ref(false);
const isVisible = toRef(props, 'modelValue');

watchEffect(() => {
    if (isVisible.value) {
        isOpen.value = true;
    }
})

const hide = () => {
    emit('update:modelValue', false);
}

const close = () => {
    isOpen.value = false;
}

usePopupEscClose(hide);
</script>

<template>
    <Teleport to="#popups">
        <AppPopupWrap
            v-if="isOpen"
            :visible="isVisible"
            @close="hide"
            @after-leave="close"
        >
            <AppPopupHead @close="hide">
                {{ title }}
            </AppPopupHead>
            <slot />

        </AppPopupWrap>
    </Teleport>
</template>