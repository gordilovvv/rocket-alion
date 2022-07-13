export function countPlayersPercent(playersInLobby, playersCapacity) {
    return Math.floor(playersInLobby * 100 / playersCapacity);
}

export function getAllPlayersItems(playersInLobby, playersCapacity) {
    // index because we create array with indexes
    return Array.from(Array(playersCapacity).keys()).reduce((players, index) => {
        const player = playersInLobby[index];

        if (player) {
            players.push(player);
        } else {
            players.push({ address: `unknown-${ index }`, loading: true });
        }

        return players;
    }, []);
}