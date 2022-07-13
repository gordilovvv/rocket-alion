import { sendTokens } from "../web3/wallet/actions/sendTokens";
import { useWallet } from "../web3/wallet/useWallet";
import { getBalance } from "../web3/wallet/utils/getBalance";
import { useAlert } from "../alert/useAlert";
import { WALLET_CONNECT_ID } from "../web3/wallet/ids";
import { preloadImages } from "@/utils/image";
import { subscribeToGame } from "@/api/realtime/subscribers/game";
import { useRoomsStore } from "@/stores/rooms";

export const GAME_DURATION_MS = import.meta.env.VITE_GAME_DURATION_MS;

// TODO: check
export async function startGame(id, redirectCallback) {
    const roomsStore = useRoomsStore();
    const { walletId, address, balance } = useWallet();

    const { alert, showAlert, hideAlert } = useAlert();

    showAlert({
        view: 'success',
        text: walletId === WALLET_CONNECT_ID
            ? 'Confirm sending BNB in ​your wallet app'
            : 'Confirm sending BNB in metamask window',
        autoClose: false
    });

    let transferPromiseResolve;
    const transferPromise = new Promise(
        resolve => transferPromiseResolve = resolve
    );

    const transferTokens = async walletAddress => {
        try {
            const { bet } = roomsStore.rooms[id];

            const transaction = await sendTokens(
                bet,
                walletAddress
            );

            alert.text = 'Waiting for game start...';

            const balanceValue = await getBalance(address.value);

            balance.value = balanceValue;

            transferPromiseResolve(transaction);
        } catch (error) {
            showAlert({
                view: 'danger',
                text: 'Oops! Something gone wrong...'
            });
            
            console.error(error);

            transferPromiseResolve();
        }
    };

    const { sendPayTransaction } = subscribeToGame(
        address.value,
        id,
        transferTokens
    );

    const transaction = await transferPromise;

    if (transaction?.transactionHash) {
        await sendPayTransaction(transaction.transactionHash);

        hideAlert();

        redirectCallback?.();
    } else {
        showAlert({
            view: 'danger',
            text: 'Oops! Something gone wrong...'
        });
    }
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