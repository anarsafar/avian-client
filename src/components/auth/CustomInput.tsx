import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  Path,
} from 'react-hook-form';
import { useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <InputGroup>
      <Input
        id={id as string}
        // eslint-disable-next-line no-nested-ternary
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        padding="2rem"
        paddingRight="3.5rem"
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
      {type === 'password' && (
        <InputRightElement padding="2rem 1rem 2rem 0">
          <Button
            variant="unstyled"
            onClick={handleTogglePassword}
            color="gray-4"
            fontSize="1.5rem"
            pb="2rem"
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default CustomInput;
