import { reactive } from 'vue';

export const gamePaymentState = reactive({
    starting: false,
    loading: false,
    error: false
});

export function useGamePayment() {
    const setStarting = () => {
        gamePaymentState.starting = true;
        gamePaymentState.loading = gamePaymentState.error = false;
    };

    const setLoading = () => {
        gamePaymentState.loading = true;
        gamePaymentState.starting = gamePaymentState.error = false;
    };

    const setError = () => {
        gamePaymentState.error = true;
        gamePaymentState.starting = gamePaymentState.loading = false;
    };

    const reset = () => {
        gamePaymentState.starting = gamePaymentState.loading = gamePaymentState.error = false;
    };

    return {
        setStarting,
        setLoading,
        setError,
        reset
    };
}