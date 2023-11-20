import { Input, InputProps } from '@chakra-ui/react';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupInterface } from '@/schemas/auth.schemas';

interface CustomInputProps extends InputProps {
  id: 'email' | 'password' | 'name' | 'confirmPassword';
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<SignupInterface>;
}

function CustomInput({
  id,
  type,
  placeholder,
  errors,
  register,
  ...rest
}: CustomInputProps) {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      padding="2rem"
      backgroundColor="#F8F8F9"
      color="gray-4"
      border={errors[id] ? '1px solid' : 'none'}
      borderColor={errors[id] ? 'red.300' : '#fff'}
      borderRadius="0.5rem"
      fontFamily="openSans"
      fontSize="1.2rem"
      fontWeight="400"
      lineHeight="1.6rem"
      letterSpacing="0.16px"
      _placeholder={{
        fontFamily: 'openSans',
        fontSize: '1.2rem',
        color: 'gray-4',
        fontWeight: '400',
        lineHeight: '1.6rem',
        letterSpacing: '0.16px',
      }}
      {...register(id)}
      {...rest}
    />
  );
}

export default CustomInput;
