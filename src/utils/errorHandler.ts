import { AxiosError } from 'axios';

const handleError = <T>(error: unknown): T | AxiosError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data as T;
    } 
    if(error.message === "Network Error"){
        return { error: error.message } as T
    }
      return error;
  } 
    throw new Error('Unexpected error occurred');
};

export default handleError;
