import { ref } from "vue";
import axios from 'axios';
import { socket } from "../realtime";
import { useGameStore } from "@/stores/game";
import { API_URL } from "@/config";

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

    socket.on('game', ({ gameType, players, close = false, error }) => {
        if (error)
            return onError?.(error);

        if (!gameStore.game)
            gameStore.game = {};

        if (gameType) 
            gameStore.game.id = gameType;

        gameStore.game.players = players;

        // close prop uses for:
        // when user went offline and missed all updates from socket we have to show him results of game
        gameStore.game.close = close
            ? true 
            : false;

        if (!gameStarted) {
            gameStarted = true;
            onGameStart?.();
        }
    });
}

export function payForGame({
    txHash,
    playerAddress,
    gameType,
    onSuccessPay,
    onError
}) {
    axios.post(
        '/game/pay',
        {
            transaction: txHash,
            address: playerAddress,
            gameType
        },
        { baseURL: API_URL }
    )
        .then(() => onSuccessPay())
        .catch((error) => onError(error?.response?.data?.error ?? error.message));
}