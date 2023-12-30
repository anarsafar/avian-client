import { AxiosError } from 'axios';
import { ErrorResponse } from '@/api';

const handleError = (error: unknown): ErrorResponse | AxiosError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data as ErrorResponse;
    }

    if (error.isAxiosError && error.message === 'Network Error') {
      return { error: 'Network Error' } as ErrorResponse;
    }

    return error;
  }

  throw new Error('Unexpected error occurred');
};

export default handleError;
