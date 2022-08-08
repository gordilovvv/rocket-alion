import { ref } from 'vue';
import { socket } from './realtime';

export function useSocketLoading() {
    const isLoading = ref(true);

    socket.on('connect', () => {
        isLoading.value = false;
    });

    socket.on('disconnect', () => {
        isLoading.value = true;
    });

    socket.on('reconnect', () => {
        isLoading.value = false;
    });

    return {
        isLoading
    };
}