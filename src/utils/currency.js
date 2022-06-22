export function formatCurrency(value) {
    const sum = value > 1
        ? value
        : value.toFixed(4);

    return `${ parseFloat(sum) } BNB`;
}