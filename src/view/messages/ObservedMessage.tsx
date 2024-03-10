import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { MessageI } from '@/schemas/message';
import useUser from '@/hooks/store/useUser';

interface Observer {
  onIntersect: (message: MessageI) => void;
  isCurrentUser: boolean;
  isFirstMessageFromUser: boolean;
  textTheme: string;
  hoverTheme: string;
  message: MessageI;
}

function ObserverMessage({
  onIntersect,
  isCurrentUser,
  isFirstMessageFromUser,
  textTheme,
  hoverTheme,
  message,
}: Observer) {
  const { user } = useUser();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.85,
  });

  useEffect(() => {
    if (
      inView &&
      onIntersect &&
      !message.isRead &&
      message.sender !== user?._id
    ) {
      onIntersect(message);
    }
  }, [inView, onIntersect, message, user?._id]);

  return (
    <Box
      maxW="calc(calc(100vw - 36rem) * 0.3)"
      fontSize="1.2rem"
      borderRadius={isCurrentUser ? '10px 1px 10px 10px' : '1px 10px 10px 10px'}
      fontWeight={400}
      ms={isCurrentUser || isFirstMessageFromUser ? 'auto' : '4.1rem'}
      color={textTheme}
      p="1.2rem"
      bg={hoverTheme}
      whiteSpace="pre-wrap"
      ref={user?._id !== message.sender ? ref : null}
    >
      {message.content.replace(/<br\s*\/?>/g, '\n')}
    </Box>
  );
}

export default ObserverMessage;
