import { io } from 'socket.io-client';
import { ref, watchEffect } from 'vue';

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ['websocket']
});

export const messages = ref([]);

socket.on('connect', () => {
    messages.value.push('socket connect');
    messages.value.push(socket.id);
});
socket.on('disconnect', reason => messages.value.push('disconnect', reason));



// watchEffect(() => {
//     if (messages.value.length > 2) {
//         messages.value.shift();
//     }
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