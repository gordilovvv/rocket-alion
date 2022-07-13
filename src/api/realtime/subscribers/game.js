import { useGameStore } from "@/stores/game";
import { socket } from "../realtime";

// TODO: fix
export function subscribeToGame(playerAddress, gameType, payCallback) {
    let id;
    const gameStore = useGameStore();

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
        res => {
            id = res.ID;
            
            payCallback(res.walletAddress);
        }
    );

    return {
        sendPayTransaction
    };

    async function sendPayTransaction(txHash) {
        let resolve;
        const promise = new Promise(
            r => resolve = r
        );

        socket.emit(
            'pay',
            { ID: id, transaction: txHash }
        );

        socket.on('game', ({ gameType, players }) => {
            gameStore.game.id = gameType;
            gameStore.game.players = players;

            if (resolve) {
                resolve();
            }
        });

        return promise;
    }
}

export function unsubscribeFromGame() {
    socket.emit(
        'unsubscribe',
        { scope: 'game' }
    );
}

// const fakeGameStart = () => {
//     const looserIndex = 0;
    

//     if ( gameStore.game.players.length === 3)
//         gameStore.game.players
//             .push({ address: '0xf89d7b9c864f589bbF53a82105107622B35EaA40' });

//     gameStore.game.players = gameStore.game.players
//         .map((player, index) => ({
//             ...player,
//             resultAmount: index === looserIndex ? -0.001 : 1
//         }));
// };