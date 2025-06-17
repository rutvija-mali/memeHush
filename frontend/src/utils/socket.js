import { io } from 'socket.io-client';

const socket = io('https://memehush.onrender.com', {
  transports: ['websocket', 'polling']
});

export default socket;
