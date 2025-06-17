import { io } from 'socket.io-client';

const SOCKET_URL = 'https://memehush.onrender.com';
console.log("📡 Connecting to socket:", SOCKET_URL); // ✅ ADD THIS

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling']
});

export default socket;

