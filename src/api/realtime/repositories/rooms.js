import { onMounted, ref } from "vue";
import { useWallet } from "@/services/web3/wallet/useWallet";
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
    const { address } = useWallet();

    const rooms = await new Promise(resolve => {
        requestScopedDataFromSocket(
            'gameType',
            {
                address: address.value
            },
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