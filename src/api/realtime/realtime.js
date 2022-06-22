import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL);

function sendMessageToSocket(type, payload) {
    socket.emit(type, payload);
}

export function subscribeToSocketScope(scope, callback) {
    sendMessageToSocket(
        'subscribe',
        { scope }
    );

    socket.on(
        scope,
        data => callback(data)
    );
}

export function unsubscribeFromSocketScope(scope) {
    sendMessageToSocket(
        'unsubscribe',
        { scope }
    );
}