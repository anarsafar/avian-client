/* eslint-disable no-console */
import { useQueryClient } from '@tanstack/react-query';

export enum StorageType {
  Session = 'sessionStorage',
  Local = 'localStorage',
}

function usePersist() {
  const queryClient = useQueryClient();

  const persistData = <T>(
    data: T,
    queryKey: string,
    storageType?: StorageType
  ) => {
    try {
      queryClient.setQueryData([queryKey], data);
      if (storageType) {
        window[storageType].setItem(queryKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error during data persisting: ', error);
      throw error;
    }
  };

  const getPersistedData = <T>(
    queryKey: string,
    storageType?: StorageType
  ): T | undefined => {
    const queryData = queryClient.getQueryData([queryKey]) as T | undefined;
    const storedData = storageType && window[storageType].getItem(queryKey);

    if (queryData) {
      return queryData;
    }

    if (storedData) {
      queryClient.setQueryData([queryKey], JSON.parse(storedData));
      return JSON.parse(storedData);
    }

    return undefined;
  };

  return { persistData, getPersistedData };
}

export default usePersist;
