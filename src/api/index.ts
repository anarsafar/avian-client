import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  withCredentials: true,
});

export enum RequestType {
  Get = 'get',
  Post = 'post',
  Delete = 'delete',
  Put = 'put',
  Patch = 'patch',
}

export interface ErrorResponse {
  error: string;
  stack?: string;
}

export interface SuccessResponse {
  message: string;
}

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

const api = async <T, K>(
  data: K,
  endpoint: string,
  requestType: RequestType,
  accessToken?: string
): Promise<T> => {
  try {
    const axiosConfig = {
      url: endpoint,
      data,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    };
    const result: AxiosResponse = await instance.request({
      ...axiosConfig,
      method: requestType.toLowerCase(),
    });
    return result.data;
  } catch (error) {
    const handledError = handleError(error);

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw handledError;
  }
};

export default api;
