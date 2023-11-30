import { Input, InputProps } from '@chakra-ui/react';
import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  Path,
} from 'react-hook-form';

interface CustomInputProps<T extends FieldValues>
  extends Omit<InputProps, 'id'> {
  id: keyof T;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

function CustomInput<T extends FieldValues>({
  id,
  type,
  placeholder,
  errors,
  register,
  ...rest
}: CustomInputProps<T>) {
  return (
    <Input
      id={id as string}
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
      {...register(id as Path<T>)}
      {...rest}
    />
  );
}

export default CustomInput;
