import { ref } from "vue";
import { messages, socket } from "../realtime";
import { useGameStore } from "@/stores/game";

export const wasSubscribed = ref(false);

export async function subscribeToGame(playerAddress, gameType, payCallback) {
    let resolve;
    let promise = new Promise(
        r => resolve = r
    );
    
    let payId;
    const gameStore = useGameStore();

    const sendPayTransaction = transaction => {
        socket.emit(
            'pay',
            { ID: payId, transaction }
        );
    };

    socket.emit(
        'subscribe',
        {
            scope: 'game',
            playerAddress,
            gameType
        }
    );

    socket.once(
        'pay',
        async res => {
            payId = res.ID;
            
            const transaction = await payCallback(res.walletAddress);

            if (transaction) {
                sendPayTransaction(transaction);
            } else {
                resolve({ ok: false });
            }
        }
    );

    socket.on('game', ({ gameType, players }) => {
        messages.value.push('data from sockets', new Date().getMinutes());
        
        if (!gameStore.game)
            gameStore.game = {};

        if (gameType) 
            gameStore.game.id = gameType;

        gameStore.game.players = players;

        resolve({ ok: true });
    });

    wasSubscribed.value = true;

    return promise;
}