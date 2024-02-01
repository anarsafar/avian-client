import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import useAuth from '@/hooks/auth/useAuth';

interface SocketI {
  children: React.ReactNode;
}

const SocketContext = createContext(null) as React.Context<Socket | null>;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: SocketI) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const socketURL = import.meta.env.VITE_SOCKET_URL;
    const newSocket = io(socketURL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
