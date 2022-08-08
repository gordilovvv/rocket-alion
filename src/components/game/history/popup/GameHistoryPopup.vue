<script setup>
import { computed } from 'vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import { ellipseAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/currency';
import { createTxExplorerLink } from '@/services/web3/wallet/utils/explorerLink';

const props = defineProps({
    txs: {
        type: Array,
        default: () => ([])
    },
    winningAmount: {
        type: Number,
        default: 0
    },
    visible: Boolean
});

const emit = defineEmits({
    'update:visible': null
});

const isVisible = computed({
    get() {
        return props.visible;
    },
    set(value) {
        emit('update:visible', value);
    }
});

const confirmedTxs = computed(
    () => props.txs.filter(tx => tx !== null)
);

const prizeSum = computed(
    () => formatCurrency(props.winningAmount)
);
</script>

<template>
    <AppPopup
        v-model="isVisible"
        title="Game transactions"
    >
        <div :class="styles.list">
            <a
                v-for="(hash, index) in confirmedTxs"
                :key="hash"
                :href="createTxExplorerLink(hash)"
                :class="styles.item"
                rel="noopener noreferrer"
                target="_blank"
            >
                <div :class="styles.itemTx">
                    {{ index + 1 }}. {{ ellipseAddress(hash, 6) }}
                </div>

                <div :class="styles.itemSum">
                    + {{ prizeSum }}
                </div>
            </a>
        
        </div>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './GameHistoryPopup.module.scss';
</style>