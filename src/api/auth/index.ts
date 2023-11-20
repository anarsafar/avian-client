/* eslint-disable no-console */
import { SignupInterface } from '@/schemas/auth.schemas';
import { instance } from '../instance';
import { NetworkResponse } from '@/interfaces/response.interface';
import handleError from '@/utils/errorHandler';

const authUser = {
  signUp: async (data: SignupInterface): Promise<NetworkResponse> => {
    try {
      const response = await instance.post('auth/signup', data);
      return response.data as NetworkResponse;
    } catch (error) {
      const handledError = handleError<NetworkResponse>(error);

      console.error('Sign-up error:', handledError, 'Original Error:', error);

      // You might handle specific types of errors differently here if needed

      return handledError;
    }
  },
};

export default authUser;
