import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import usePersist, { StorageType } from '@/hooks/store/usePersist';

interface SocketI {
  children: React.ReactNode;
}

const SocketContext = createContext(null) as React.Context<Socket | null>;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: SocketI) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getPersistedData } = usePersist();
  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  useEffect(() => {
    const socketURL = import.meta.env.VITE_SOCKET_URL;
    const newSocket = io(socketURL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken?.accessToken}`,
          },
        },
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
