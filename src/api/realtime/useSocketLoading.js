import { ref } from 'vue';
import { socket } from './realtime';

export function useSocketLoading() {
    const isLoading = ref(true);

    socket.on('connect', () => {
        if (isLoading.value) {
            isLoading.value = false;
        }
    });

    return {
        isLoading
    };
}