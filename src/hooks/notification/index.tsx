/* eslint-disable jsx-a11y/media-has-caption */
import { RefObject, useEffect } from 'react';

import useContacts from '@hooks/contact/useContacts';
import useConversation from '@hooks/conversations/useConversation';
import useUser from '@hooks/store/useUser';
import { useSocket } from '@/context/socket.context';

function useNotification(audioRef: RefObject<HTMLAudioElement>) {
  const socket = useSocket();

  const { contacts } = useContacts();
  const { conversations } = useConversation();
  const { user } = useUser();

  useEffect(() => {
    socket?.on('notification', (senderId: string, recipientId: string) => {
      const contact = contacts?.contacts.find(
        (person) => person.user._id === senderId
      );
      let ifSenderExist;
      if (!contact) {
        conversations?.conversations.forEach((conversation) => {
          ifSenderExist = conversation.participants.find(
            (participant) => participant._id === senderId
          );
        });
      }

      if (
        recipientId === user?._id &&
        user?.notification &&
        (contact?.notification || ifSenderExist)
      ) {
        audioRef.current?.play();
      }
    });

    return () => {
      socket?.off('notification');
    };
  }, [audioRef, contacts, conversations, socket, user]);
}

export default useNotification;
