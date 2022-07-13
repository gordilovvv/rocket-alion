import { ellipseAddress } from "@/utils/address";
import { onMounted, onUnmounted, reactive, ref, unref } from "vue";
import { requestScopedDataFromSocket } from "../realtime";

export function usePlayerStatistic(address) {
    const socketsCallbacks = new Set();

    const isLoadingStats = ref(true);
    const isLoadingHistory = ref(true);

    const stats = reactive({
        totalWon: 0,
        gamesWon: 0,
        gamesLose: 0
    });
    const gamesHistory = ref([]);

    onMounted(() => {
        const payload = { address: unref(address) };

        socketsCallbacks.add(requestScopedDataFromSocket(
            'playerStatsCount',
            payload,
            ({ totalWonSum: totalWon, gamesWon, gamesLose }) => {
                stats.totalWon = totalWon;
                stats.gamesWon = gamesWon;
                stats.gamesLose = gamesLose;
                
                isLoadingStats.value = false;
            }
        ));
        
        socketsCallbacks.add(requestScopedDataFromSocket(
            'playerStats',
            payload,
            games => {
                // TODO: remove this
                gamesHistory.value = games.map(game => ({
                    id: ellipseAddress(game.ID),
                    betAmount: 0,
                    winningAmount: 0,
                    timestamp: 0
                }));
                isLoadingHistory.value = false;
            }
        ));
    });

    onUnmounted(() => socketsCallbacks.forEach(callback => callback()));

    return {
        stats,
        gamesHistory,
        isLoadingStats,
        isLoadingHistory
    };
}