import { io } from 'socket.io-client';

const getSocket = () => {
  const socket = io();
  return socket;
};

export default getSocket;
