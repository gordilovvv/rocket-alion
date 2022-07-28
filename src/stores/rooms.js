import { defineStore } from 'pinia';

export const useRoomsStore = defineStore('rooms', {
    state: () => ({
        rooms: null
        // rooms: {
        //     rookie: {
        //         name: 'Rookie',
        //         bet: 0.011,
        //         prize: 0.12,
        //         chance: 75,
        //         best: false,
        //         playersCapacity: 4 // TODO: add to backend
        //     },
        //     hunter: {
        //         name: 'Bounty hunter',
        //         bet: 0.5,
        //         prize: 0.6,
        //         chance: 75,
        //         best: false,
        //         playersCapacity: 4 // TODO: add to backend
        //     },
        //     king: {
        //         name: 'King',
        //         bet: 1,
        //         prize: 1.2,
        //         chance: 75,
        //         best: true,
        //         playersCapacity: 4 // TODO: add to backend
        //     }
        // }
    })
});