import { io, Socket } from 'socket.io-client';

import { create } from 'zustand';

interface SocketI {
  socket: Socket;
}

const useSocket = create<SocketI>(() => {
  return {
    socket: io('ws://localhost:8080'),
  };
});

export default useSocket;
