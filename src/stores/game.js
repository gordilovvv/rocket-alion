import { defineStore } from "pinia";
import { getGameFromStorage } from "@/services/playground/storage";

export const useGameStore = defineStore('game', {
    state: () => ({
        game: getGameFromStorage(), // { id, players = [] }
        isGameStarting: false
    })
});