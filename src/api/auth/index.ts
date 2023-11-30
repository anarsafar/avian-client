/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';

import { LoginInterface, SignupInterface } from '@/schemas/auth.schemas';
import { instance } from '../instance';
import {
  ErrorResponse,
  SuccessResponse,
} from '@/interfaces/response.interface';
import handleError from '@/utils/errorHandler';

const authUser = {
  signUp: async (
    data: SignupInterface
  ): Promise<SuccessResponse | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.post('auth/signup', data);
      return result.data as SuccessResponse;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
  logIn: async (
    data: LoginInterface
  ): Promise<{ accessToken: string } | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.post('auth/login', data);
      return result.data;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
};

export default authUser;
