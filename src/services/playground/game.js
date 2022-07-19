import { sendTokens } from "../web3/wallet/actions/sendTokens";
import { useWallet } from "../web3/wallet/useWallet";
import { getBalance } from "../web3/wallet/utils/getBalance";
import { useAlert } from "../alert/useAlert";
import { preloadImages } from "@/utils/image";
import { subscribeToGame } from "@/api/realtime/subscribers/game";
import { useRoomsStore } from "@/stores/rooms";
import { useGamePayment } from "./transaction/payment";

export const GAME_DURATION_MS = import.meta.env.VITE_GAME_DURATION_MS;

// fix
// https://docs.walletconnect.com/mobile-linking

export async function startGame(id, redirectCallback) {
    const roomsStore = useRoomsStore();
    const gamePayment = useGamePayment();
    const { address, balance } = useWallet();

    const transferTokens = async walletAddress => {
        try {
            gamePayment.setLoading();

            const { bet } = roomsStore.rooms[id];

            const transaction = await sendTokens(
                bet,
                walletAddress
            );

            gamePayment.setStarting();

            const balanceValue = await getBalance(address.value);

            balance.value = balanceValue;

            return transaction.transactionHash;
        } catch (error) {
            console.error(error);

            gamePayment.setError();

            return false;
        }
    };

    await subscribeToGame(
        address.value,
        id,
        transferTokens
    );

    gamePayment.reset();
    redirectCallback?.();
}

export async function autoConnectToGame(id, failCallback) {
    // if (wasSubscribed.value)
    //     return;

    const { address } = useWallet();
    const { showAlert } = useAlert();

    await subscribeToGame(
        address.value,
        id,
        () => {
            failCallback?.();

            showAlert({
                view: 'danger',
                text: 'You are not in the game!'
            });
        }
    );
}

export function isPlayerWinner(resultAmount) {
    return Math.sign(resultAmount) !== -1;
}

export function preparePlayersForRockets(players, currentPlayerAddress) {
    return players.reduce((arr, { address }, index) => {
        const player = {
            num: index + 1,
            address,
            currentPlayer: currentPlayerAddress === address
        };

        if (index < players.length / 2) {
            arr[0].push(player);
        } else {
            arr[1].push(player);
        }

        return arr;
    }, [[], []]);
}

export function setPlayersLooser(rocketPlayers, allPlayers) {
    return rocketPlayers.map((player, index) => ({
        ...player,
        lose: !isPlayerWinner(allPlayers[index].resultAmount)
    }));
}

export async function preloadAllGameImages() {
    return preloadImages([
        '/playground/images/explosion-sprite.png',
        '/playground/images/clouds.png',
        '/playground/images/earth.png',
        '/playground/images/lose-result.png',
        '/playground/images/planet-big.png',
        '/playground/images/planet-small.png',
        '/playground/images/stones.png',
        '/playground/images/win-result.png',
        '/playground/images/rockets/rocket-1.png',
        '/playground/images/rockets/rocket-2.png',
        '/playground/images/rockets/rocket-3.png',
        '/playground/images/rockets/rocket-4.png'
    ]);
}