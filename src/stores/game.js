import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        game: null, // { id, players = [] }
        isGameStarting: false
    })
});