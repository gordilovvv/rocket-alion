import { watchEffect } from "vue";
import { ls } from "@/utils/localStorage";

let stopWatcher;

const GAME_STORAGE_KEY = 'activeGame';

export function getGameFromStorage(defaultValue = null) {
    return ls.get(GAME_STORAGE_KEY) ?? defaultValue;
}

export function synchronizeGameStorage(gameStore) {
    stopWatcher = watchEffect(() => {
        if (gameStore.game) {
            ls.set(
                GAME_STORAGE_KEY,
                { ...gameStore.game }
            );
        } else {
            ls.remove(GAME_STORAGE_KEY);
        }
    });
}

export function resetGameStorage() {
    ls.remove(GAME_STORAGE_KEY);

    stopWatcher?.();
}