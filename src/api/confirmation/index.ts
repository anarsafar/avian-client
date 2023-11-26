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
  ConfirmationInterface,
  EmailValidateInterface,
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
  resendEmail: async (
    email: EmailValidateInterface
  ): Promise<SuccessResponse | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.post(
        'confirmation/resend',
        email
      );
      return result.data as SuccessResponse;
    } catch (error) {
      console.log(error);
      const handledError = handleError<ErrorResponse>(error);

      throw handledError;
    }
  },
  getExpiration: async (email: {
    email: string;
  }): Promise<{ confirmationTimestamp: string }> => {
    try {
      const result: AxiosResponse = await instance.post(
        'confirmation/expiration',
        email
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
