import { v4 as uuidv4 } from 'uuid';

const STORAGE_TYPE = 'socket-client-id';

// TODO: sessionStorage type
export function getSocketId() {
    if (sessionStorage.getItem(STORAGE_TYPE))
        return sessionStorage.getItem(STORAGE_TYPE);

    const socketId = uuidv4(); 

    sessionStorage.setItem(
        STORAGE_TYPE,
        socketId
    );

    return socketId;
}