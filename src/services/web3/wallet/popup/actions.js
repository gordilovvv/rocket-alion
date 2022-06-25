import { isWalletConnectionPopupOpened } from './state';

export function openWalletConnectionPopup() {
    isWalletConnectionPopupOpened.value = true;
}

export function closeWalletConnectionPopup() {
    isWalletConnectionPopupOpened.value = false;
}