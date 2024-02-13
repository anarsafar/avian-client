import { create } from 'zustand';
import { MessageI } from '@/schemas/message';

interface Message {
  messages: MessageI[] | [];
  setMessages: (newMessage: MessageI[] | MessageI) => void;
  clearMessages: () => void;
}

const useActiveConversation = create<Message>((set) => {
  return {
    messages: [],
    setMessages: (newMessage) => {
      if (!Array.isArray(newMessage)) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      } else {
        set({ messages: newMessage.reverse() });
      }
    },
    clearMessages: () => {
      set({ messages: [] });
    },
  };
});

export default useActiveConversation;
