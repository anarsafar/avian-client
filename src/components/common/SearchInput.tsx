import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchInput({ value, onChange }: SearchProps) {
  const input = useColorModeValue('input-light', 'input-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholder = useColorModeValue('gray-4', 'text-darker');
  const text = useColorModeValue('gray-4', 'text-dark');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <InputGroup backgroundColor={input} borderRadius="0.9rem">
      <InputLeftElement pointerEvents="none" mt="0.4rem" ms="0.4rem">
        <SearchIcon color={logo} fontSize="1.4rem" />
      </InputLeftElement>
      <Input
        type="text"
        ref={inputRef}
        p="1.7rem 1.7rem 1.7rem 3.2rem"
        border="none"
        placeholder="Search..."
        fontFamily="openSans"
        fontSize="1.2rem"
        fontWeight="400"
        lineHeight="1.6rem"
        letterSpacing="0.16px"
        color={text}
        focusBorderColor={logo}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        _placeholder={{
          fontFamily: 'openSans',
          fontSize: '1.2rem',
          color: placeholder,
          fontWeight: '400',
          lineHeight: '1.6rem',
          letterSpacing: '0.16px',
        }}
      />
    </InputGroup>
  );
}

export default SearchInput;
