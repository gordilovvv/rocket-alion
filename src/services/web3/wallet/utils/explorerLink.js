import { ACTIVE_CHAIN_ID, BASE_BSC_SCAN_URLS } from "@/config";

export function createTxExplorerLink(hash) {
    return `${ BASE_BSC_SCAN_URLS[ACTIVE_CHAIN_ID] }/tx/${ hash }`;
}