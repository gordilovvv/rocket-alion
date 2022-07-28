import { ref } from "vue";
import { socket } from "../realtime";
import { useGameStore } from "@/stores/game";

export const wasSubscribed = ref(false);

// export async function subscribeToGame(playerAddress, gameType, payCallback) {
//     let resolve;
//     let promise = new Promise(
//         r => resolve = r
//     );
    
//     let payId;
//     const gameStore = useGameStore();

//     const sendPayTransaction = transaction => {
//         socket.emit(
//             'pay',
//             { ID: payId, transaction }
//         );
//     };

//     socket.emit(
//         'subscribe',
//         {
//             scope: 'game',
//             playerAddress,
//             gameType
//         }
//     );

//     socket.once(
//         'pay',
//         async res => {
//             payId = res.ID;
            
//             const transaction = await payCallback(res.walletAddress);

//             if (transaction) {
//                 sendPayTransaction(transaction);
//             } else {
//                 resolve({ ok: false });
//             }
//         }
//     );

//     socket.on('game', ({ gameType, players }) => {
//         if (!gameStore.game)
//             gameStore.game = {};

//         if (gameType) 
//             gameStore.game.id = gameType;

//         gameStore.game.players = players;

//         resolve({ ok: true });
//     });

//     wasSubscribed.value = true;

//     return promise;
// }



export function subscribeToGame({ playerAddress, gameType, onGameStart, onError }) {
    let gameStarted = false;
    const gameStore = useGameStore();

    socket.emit(
        'subscribe',
        {
            scope: 'game',
            playerAddress,
            gameType
        }
    );

    socket.on('game', ({ gameType, players, error }) => {
        if (error)
            return onError?.(error);

        if (!gameStore.game)
            gameStore.game = {};

        if (gameType) 
            gameStore.game.id = gameType;

        gameStore.game.players = players;

        if (!gameStarted) {
            gameStarted = true;
            onGameStart?.();
        }
    });
}

export function payForGame(txHash, playerAddress, gameType) {
    socket.emit(
        'pay',
        {
            transaction: txHash,
            address: playerAddress,
            gameType
        }
    );
}