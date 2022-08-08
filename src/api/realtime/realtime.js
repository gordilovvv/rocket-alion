import { io } from 'socket.io-client';
import { getSocketId } from './id';
import { SOCKET_URL } from '@/config';

export const socket = io(SOCKET_URL, {
    query: `CID=${ getSocketId() }`,
    transports: ['websocket'],
    useNativeTimers: true
});

// socket.on('connect', () => {
//     console.log('connect');
// });

// socket.on('disconnect', () => {
//     console.log('disconnect');
// });

// socket.on('reconnect', () => {
//     console.log('reconnect');
// });

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