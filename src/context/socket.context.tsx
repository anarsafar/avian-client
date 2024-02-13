import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import useAuth from '@/hooks/auth/useAuth';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useUser from '@/hooks/store/useUser';
import useActiveContact from '@/hooks/store/useActiveContact';

interface SocketI {
  children: React.ReactNode;
}

interface CustomSocket extends Socket {
  auth: {
    serverOffset?: Date;
    room?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

const SocketContext = createContext(null) as React.Context<CustomSocket | null>;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: SocketI) {
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const { activeConversation } = useActiveConversation();
  const { user } = useUser();
  const { activeContact } = useActiveContact();
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
      auth: {
        serverOffset: new Date(),
        room: activeConversation?._id,
      },
    });

    newSocket.on('connect', () => {
      newSocket.emit(
        'join-private-chat',
        activeConversation?._id,
        user?._id,
        activeContact?.user._id
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
