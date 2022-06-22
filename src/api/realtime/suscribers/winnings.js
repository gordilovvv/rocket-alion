import { onMounted, onUnmounted, ref, watch } from 'vue'
import { subscribeToSocketScope, unsubscribeFromSocketScope } from '../realtime';

export function useRecentWinnings() {
    const winnings = ref([]);

    const isLoading = ref(true);

    const subscribe = () => {
        subscribeToSocketScope('recentWinnings', ({ games }) => {
            winnings.value = games;
        });
    }

    const unsubscribe = () => {
        unsubscribeFromSocketScope('recentWinnings');
    }

    watch(winnings, (_, prevWinnings) => {
        if (prevWinnings.length === 0) {
            isLoading.value = false;
        }
    })

    onMounted(subscribe);

    onUnmounted(unsubscribe);

    return {
        winnings,
        isLoading
    };
}