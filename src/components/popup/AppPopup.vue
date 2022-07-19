<script setup>
import { ref, toRef, watchEffect } from 'vue';
import AppPopupWrap from './wrap/AppPopupWrap.vue';
import AppPopupHead from './head/AppPopupHead.vue';
import { usePopupEscClose } from './hooks/usePopupEscClose';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    modelValue: Boolean,
    hideHeader: Boolean,
    disableClose: Boolean // disable close by user
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
});

const hide = () => {
    if (props.disableClose)
        return;

    emit('update:modelValue', false);
};

const close = () => {
    isOpen.value = false;
};

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
            <AppPopupHead
                v-if="!hideHeader"
                @close="hide"
            >
                {{ title }}
            </AppPopupHead>
            <slot />

        </AppPopupWrap>
    </Teleport>
</template>