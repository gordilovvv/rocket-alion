import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
    useNativeTimers: true,
    reconnectionAttempts: 5
});

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

// Like a Rest API
export function requestScopedDataFromSocket(scope, payload, callback) {
    sendMessageToSocket(
        scope,
        payload
    );

    if (!callback)
        return;

    const onSocketEvent =  data => callback(data);

    socket.once(
        scope,
        onSocketEvent
    );
    
    return () => {
        socket.removeListener(
            scope,
            onSocketEvent
        );
    };
}