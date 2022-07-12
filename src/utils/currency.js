export function formatCurrency(value) {
    const sum = value > 1
        ? value.toFixed(2)
        : value.toFixed(4);

    return `${ parseFloat(sum) } BNB`;
}