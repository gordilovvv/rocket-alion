import { computed } from "vue";
import { useWallet } from "../useWallet";
import { ACTIVE_CHAIN_ID } from "@/config";

const { chainId, isConnected } = useWallet();

export const chainError = computed(() => {
    return isConnected.value && ACTIVE_CHAIN_ID !== chainId.value;
});