import { onMounted, onUnmounted, ref } from 'vue';
import { subscribeToSocketScope, unsubscribeFromSocketScope } from '../realtime';

export function useRecentWinnings() {
    const winnings = ref([]);

    const isLoading = ref(true);

    const subscribe = () => {
        subscribeToSocketScope('recentWinnings', games => {
            winnings.value = games;

            if (isLoading.value) {
                isLoading.value = false;
            }
        });
    };

    const unsubscribe = () => {
        unsubscribeFromSocketScope('recentWinnings');
    };

    onMounted(subscribe);

    onUnmounted(unsubscribe);

    return {
        winnings,
        isLoading
    };
}