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

export async function getRooms() {
    const rooms = await new Promise(resolve => {
        requestScopedDataFromSocket(
            'gameType',
            {},
            rooms => {
                const list = rooms.reduce((obj, { id, limitPlayers, ...room }) => {
                    obj[id] = {
                        ...room,
                        playersCapacity: limitPlayers
                    };

                    return obj;
                }, {});

                resolve(list);
            }
        );
    });

    return rooms;
}