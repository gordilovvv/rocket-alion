import { onMounted, ref } from "vue";
import { requestScopedDataFromSocket } from "../realtime";

export function useRooms() {
    const rooms = ref([]);
    const isLoading = ref(true);
    
    onMounted(() => requestScopedDataFromSocket(
        'gameType',
        {},
        roomsList => {
            rooms.value = roomsList;
            isLoading.value = false;
        }
    ));

    return {
        rooms,
        isLoading
    };
}