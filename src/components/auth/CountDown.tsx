import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

interface CountDownProps {
  confirmationTimestamp: string;
}

const calculateDiff = (timestamp: string | Date) => {
  const cofirmationDate = new Date(timestamp).getTime();
  const expirationTime = new Date(cofirmationDate + 5 * 60 * 1000).getTime();
  const currentTime = new Date().getTime();

  const diff = expirationTime - currentTime;
  const diffInSeconds = Math.max(0, Math.floor(diff / 1000));
  return diffInSeconds;
};

function CountDown({ confirmationTimestamp }: CountDownProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState<number>(() =>
    calculateDiff(confirmationTimestamp)
  );

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    if (confirmationTimestamp !== undefined) {
      timerID = setInterval(() => {
        setRemainingTime(() => calculateDiff(confirmationTimestamp));
      }, 1000);
    }

    return () => clearInterval(timerID);
  }, [remainingTime, confirmationTimestamp]);

  const displayExpiration = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <Text
      fontFamily="openSans"
      fontWeight={300}
      fontSize="1.2rem"
      letterSpacing="0.16px"
      color={remainingTime ? '#fff' : 'red.400'}
      my="1rem"
    >
      {remainingTime === 0
        ? 'Code has expired please request new one'
        : `Code expires in ${displayExpiration(remainingTime)}`}
    </Text>
  );
}

export default CountDown;
