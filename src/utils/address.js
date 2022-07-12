export function ellipseAddress(address, width = 5) {
    return `${ address.slice(0, width) }...${ address.slice(-width) }`;
}