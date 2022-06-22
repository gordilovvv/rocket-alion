import { defineStore } from "pinia";

export function useWalletStore() {
    return defineStore('wallet', {
        state: () => ({
            address: '',
            balance: 0,
            isConnected: false
        })
    })
}