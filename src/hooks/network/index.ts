import { useState, useEffect } from 'react';

type NetworkStatus = {
  isOnline: boolean;
};

const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
  });

  const handleOnline = () => {
    setNetworkStatus({ isOnline: true });
  };

  const handleOffline = () => {
    setNetworkStatus({ isOnline: false });
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return networkStatus;
};

export default useNetworkStatus;
