import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useColorModeValue,
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
  isAuth: boolean;
}

function CustomInput<T extends FieldValues>({
  id,
  type,
  placeholder,
  errors,
  register,
  isAuth,
  ...rest
}: CustomInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const input = useColorModeValue(
    'input-light',
    isAuth ? 'input-dark' : 'input-light'
  );
  const placeholderColor = useColorModeValue(
    'gray-5',
    isAuth ? 'text-darker' : 'gray-5'
  );
  const text = useColorModeValue('gray-4', isAuth ? 'text-dark' : 'gray-4');
  const errorColor = useColorModeValue(
    'red.300',
    isAuth ? 'red.400' : 'red.300'
  );

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
        backgroundColor={input}
        color={text}
        border={errors[id] ? '2px solid' : 'none'}
        borderColor={errors[id] ? errorColor : input}
        borderRadius="0.5rem"
        fontFamily="openSans"
        fontSize="1.2rem"
        fontWeight="400"
        lineHeight="1.6rem"
        letterSpacing="0.16px"
        _placeholder={{
          fontFamily: 'openSans',
          fontSize: '1.2rem',
          color: placeholderColor,
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
            color={text}
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
