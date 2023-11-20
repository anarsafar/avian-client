/* eslint-disable no-console */
import { AxiosError } from 'axios';

/**
 * Handles Axios errors and optionally returns the response data or throws an error for non-Axios errors.
 * @param error - The error to handle.
 * @returns The response data or the Axios error.
 * @throws An error for non-Axios errors.
 */
const handleError = <T>(error: unknown): T | AxiosError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error(`Axios error: ${error.message}, Status Code: ${error.response.status}`);
      return error.response.data as T;
    } 
      console.error('Axios error without response:', error.message);
      return error;
  } 
    console.error('Non-Axios error:', error);
    throw new Error('Unexpected error occurred');
  
};

export default handleError;
