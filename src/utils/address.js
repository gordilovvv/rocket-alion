export function ellipseAddress(address, width = 7) {
    return `${ address.slice(0, width) }...${ address.slice(-width) }`;
}