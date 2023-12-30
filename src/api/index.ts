import axios, { AxiosResponse } from 'axios';
import handleError from '@/utils/networkErrorHandler';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const instance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/`,
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

interface AXiosConfig<K> {
  url: string;
  data: K;
  headers: object;
}

const api = async <T, K>(
  data: K,
  endpoint: string,
  requestType: RequestType,
  accessToken?: string
): Promise<T> => {
  try {
    const axiosConfig: AXiosConfig<K> = {
      url: endpoint,
      data,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    };

    if (data instanceof FormData) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        'Content-Type': 'multipart/form-data',
      };
    }

    const result: AxiosResponse = await instance.request({
      ...axiosConfig,
      method: requestType.toLowerCase(),
    });
    return result.data;
  } catch (error) {
    throw handleError(error);
  }
};

export default api;
