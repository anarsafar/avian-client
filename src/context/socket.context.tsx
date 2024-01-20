import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketI {
  children: React.ReactNode;
}

const SocketContext = createContext(null) as React.Context<Socket | null>;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: SocketI) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketURL = import.meta.env.VITE_SOCKET_URL;
    const newSocket = io(socketURL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
