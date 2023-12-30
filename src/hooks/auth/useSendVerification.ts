import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import usePersist, { StorageType } from '../store/usePersist';
import useCustomToast from '@/hooks/custom/useCustomToast';

import { EmailValidateInterface } from '@/schemas/user/reset.schemas';
import { ConfirmationBaseInterface } from '@/schemas/user/confirmaton.schema';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

const useSendVerification = () => {
  const { persistData } = usePersist();
  const navigate = useNavigate();
  const toast = useCustomToast();

  const { mutate: sendVerificationEmail, isPending } = useMutation({
    mutationFn: (formData: EmailValidateInterface) =>
      api<SuccessResponse, ConfirmationBaseInterface>(
        { email: formData.email, confirmationType: 'password' },
        'confirmation/send-verification',
        RequestType.Post
      ),
    mutationKey: ['recover-account'],
    onSuccess: (data, variables) => {
      persistData<ConfirmationBaseInterface>(
        {
          email: variables.email,
          confirmationType: 'password',
        },
        'verification-data',
        StorageType.Session
      );

      navigate('/verify');
    },
    onError: (error: ErrorResponse) => {
      toast('error', 'Verify Error', error);
    },
    retry: false,
    networkMode: 'always',
  });

  return { sendVerificationEmail, isPending };
};

export default useSendVerification;
