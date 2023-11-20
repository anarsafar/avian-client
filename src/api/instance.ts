import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  withCredentials: true,
});
