/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '../instance';
import {
  ErrorResponse,
  SuccessResponse,
} from '@/interfaces/response.interface';
import handleError from '@/utils/errorHandler';
import {
  ConfirmationBaseInterface,
  ConfirmationInterface,
} from '@/schemas/confirmaton.schema';

const confirmation = {
  confirmUser: async (
    data: ConfirmationInterface
  ): Promise<SuccessResponse | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.post('confirmation', data);
      return result.data as SuccessResponse;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
  sendVerification: async (
    data: ConfirmationBaseInterface
  ): Promise<SuccessResponse | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.post(
        'confirmation/send-verification',
        data
      );
      return result.data;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
  getExpiration: async (data: {
    email: string;
    confirmationType: 'email' | 'password';
  }): Promise<{ confirmationTimestamp: string }> => {
    try {
      const result: AxiosResponse = await instance.post(
        'confirmation/get-expiration',
        data
      );
      return result.data;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
};

export default confirmation;
