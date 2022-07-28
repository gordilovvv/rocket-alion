import { sendTokens } from "../web3/wallet/actions/sendTokens";
import { useWallet } from "../web3/wallet/useWallet";
import { updateBalance } from "../web3/wallet/utils/getBalance";
import { useAlert } from "../alert/useAlert";
import { preloadImages } from "@/utils/image";
import { subscribeToGame, payForGame } from "@/api/realtime/subscribers/game";
import { useRoomsStore } from "@/stores/rooms";
import { useGamePayment } from "./transaction/payment";
import { useGameStore } from "@/stores/game";
import { openWalletConnectionPopup } from "../web3/wallet/popup/actions";
import { ref, watchEffect } from "vue";

export function startGame(id, {
    onStart,
    onLoad,
    onLoadEnd
}) {
    const gameStore = useGameStore();
    const roomsStore = useRoomsStore();
    const gamePayment = useGamePayment();
    const { address, isConnected } = useWallet();

    // effects
    const setLoadingState = () => {
        onLoad();
        gamePayment.setLoading();
        gameStore.isGameStarting = true;
    };

    const setErrorState = error => {
        onLoadEnd();
        gamePayment.setError();
        gameStore.isGameStarting = false;

        console.error(error);
    };

    const setStartedState = () => {
        onStart();
        onLoadEnd();
        gamePayment.reset();
        gameStore.isGameStarting = false;
    };

    // logic
    try {
        // if no connected wallet
        if (!isConnected.value)
            return openWalletConnectionPopup();

        // is game starting already
        if (gameStore.isGameStarting)
            throw new Error('Game is staring! You cant start 2 games at one time.');

        // cal loading effect
        setLoadingState();

        let stopHashWatcher;

        const txHash = ref('');
        const { bet, gameWallet, paid = false } = roomsStore.rooms[id];

        const loadGame = () => {
            gamePayment.setStarting();

            subscribeToGame({
                playerAddress: address.value,
                gameType: id,
                onGameStart: setStartedState,
                onError: error => setErrorState(error)
            });
        };

        // if paid - start immediately
        if (paid)
            return loadGame();

        // else pay for game ad first
        sendTokens(
            bet,
            gameWallet,
            hash => txHash.value = hash,
            error => setErrorState(error)
        );

        stopHashWatcher = watchEffect(() => {
            // when tx is sent and we got tx hash
            if (txHash.value) {
                stopHashWatcher();

                payForGame(
                    txHash.value,
                    address.value,
                    id
                );

                // timeout ???
                setTimeout(() => {
                    loadGame();
                    updateBalance();
                }, 5000); // TODO: do this on socket event
            }
        });
    } catch (error) {
        setErrorState(error);
    }
}

export async function autoConnectToGame(id, failCallback) {
    const { address } = useWallet();
    const { showAlert } = useAlert();

    subscribeToGame(
        {
            playerAddress: address.value,
            gameType: id,
            onError: () => {
                failCallback?.();

                showAlert({
                    view: 'danger',
                    text: 'You are not in the game!'
                });
            },
            onGameStart: () => {
                showAlert({
                    view: 'success',
                    text: 'You are connected to game!'
                });
            }
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