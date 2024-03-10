import { useState, useEffect } from 'react';
import { useSocket } from '@/context/socket.context';

type NetworkStatus = {
  isOnline: boolean;
};

const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
  });

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        setNetworkStatus({ isOnline: false });
      });
      socket.on('reconnect', () => {
        setNetworkStatus({ isOnline: true });
      });
    }

    return () => {
      if (socket) {
        socket.off('disconnect');
        socket.off('reconnect');
      }
    };
  }, [socket]);

  return networkStatus;
};

export default useNetworkStatus;
