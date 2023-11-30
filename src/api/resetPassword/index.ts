/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';

import { instance } from '../instance';
import {
  ErrorResponse,
  SuccessResponse,
} from '@/interfaces/response.interface';
import handleError from '@/utils/errorHandler';
import { PasswordValidateInterface } from '@/schemas/reset.schemas';

const reset = {
  changePassword: async (
    data: PasswordValidateInterface
  ): Promise<SuccessResponse | AxiosError> => {
    try {
      const result: AxiosResponse = await instance.patch(
        'reset-password',
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

export default reset;
