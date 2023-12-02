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
    storageType: StorageType
  ): void => {
    try {
      queryClient.setQueryData([queryKey], data);
      window[storageType].setItem(queryKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error during data presisting: ', error);
    }
  };

  const getPersistedData = <T>(
    queryKey: string,
    storageType: StorageType
  ): T | undefined => {
    const queryData = queryClient.getQueryData([queryKey]) as T | undefined;
    const storedData = window[storageType].getItem(queryKey);

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
