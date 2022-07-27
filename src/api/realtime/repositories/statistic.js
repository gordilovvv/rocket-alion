import { onMounted, reactive, ref } from 'vue';
import { useWallet } from "@/services/web3/wallet/useWallet";
import { requestScopedDataFromSocket } from "../realtime";

export function usePlayerStatistic() {
    const { address } = useWallet();

    const isLoadingStats = ref(true);
    const isLoadingHistory = ref(true);

    const stats = reactive({
        totalWon: 0,
        gamesWon: 0,
        gamesLose: 0
    });
    const gamesHistory = ref([]);

    onMounted(() => {
        const payload = { address: address.value };

        requestScopedDataFromSocket(
            'playerStatsCount',
            payload,
            ({ totalWonSum: totalWon, gamesWon, gamesLose }) => {
                stats.totalWon = totalWon;
                stats.gamesWon = gamesWon;
                stats.gamesLose = gamesLose;
                
                isLoadingStats.value = false;
            }
        );
        
        requestScopedDataFromSocket(
            'playerStats',
            payload,
            games => {
                // TODO: remove this
                gamesHistory.value = games;
                isLoadingHistory.value = false;
            }
        );
    });

    return {
        stats,
        gamesHistory,
        isLoadingStats,
        isLoadingHistory
    };
}