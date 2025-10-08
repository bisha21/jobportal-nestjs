import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectSocket = () => {
  const token = localStorage.getItem('authToken'); // get JWT

  if (!token) {
    console.error('❌ No JWT token found in localStorage');
    return;
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    transports: ['websocket'],
    auth: {
      token, // send token directly
    },
  });

  return socket;
};

export const getSocket = () => socket;
