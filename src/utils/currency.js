export function formatCurrency(value) {
    if (isNaN(value))
        return value;

    const sum = value > 1
        ? value.toFixed(2)
        : value.toFixed(4);

    return `${ parseFloat(sum) } BNB`;
}