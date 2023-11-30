/* eslint-disable no-return-assign */
import React, { useState, useRef, useEffect } from 'react';
import { Flex, Input, InputGroup } from '@chakra-ui/react';

interface OTPInputProps {
  length: number;
  onChange: (data: string) => void;
  isError: boolean;
}

function OTPInput({ length, onChange, isError }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isError) {
      setOtp(Array(length).fill(''));
    }
  }, [isError, length]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [length]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const isValidInput = /^[0-9a-zA-Z]$/i.test(e.key);

    if (isValidInput) {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);

      if (index < length - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    } else if (e.key === 'Backspace' && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 10);
    } else if (e.key === 'Backspace' && index === 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const parsedValues = pastedData.split('').slice(0, length);

    const newOtp = [...otp];

    parsedValues.forEach((value, index) => {
      if (index < length) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <InputGroup width={{ base: '25rem', sm: '41.5rem' }}>
      <Flex gap={{ base: '0.5rem', sm: '1rem' }} margin="auto">
        {Array.from({ length }, (_, index) => (
          <Input
            type="text"
            key={index}
            borderColor={isError ? 'red-3' : '#fff'}
            ref={(el) => (inputRefs.current[index] = el)}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            onKeyUp={() => onChange(otp.join(''))}
            onPaste={handlePaste}
            maxLength={1}
            textAlign="center"
            backgroundColor="#F8F8F9"
            borderRadius="0.5rem"
            fontSize="2rem"
            fontFamily="openSans"
            fontWeight="700"
            color="gray-4"
            w={{ base: '3.8rem', sm: '6rem' }}
            h={{ base: '3.8rem', sm: '6rem' }}
          />
        ))}
      </Flex>
    </InputGroup>
  );
}

export default OTPInput;
