import { create } from 'zustand';
import { ConversationInterface } from '@/utils/conversation.interface';

interface Conversation {
  activeConversation: ConversationInterface | null;
  setActiveConversation: (newActiveConvesation: ConversationInterface) => void;
  clearConversation: () => void;
}

const useActiveConversation = create<Conversation>((set) => {
  const initialActiveConversation =
    sessionStorage.getItem('activeConversation');

  return {
    activeConversation: initialActiveConversation
      ? (JSON.parse(initialActiveConversation) as ConversationInterface)
      : null,

    setActiveConversation: (newActiveConvesation) => {
      sessionStorage.setItem(
        'activeConversation',
        JSON.stringify(newActiveConvesation)
      );

      set({ activeConversation: newActiveConvesation });
    },
    clearConversation: () => {
      set({ activeConversation: null });
      sessionStorage.removeItem('activeConversation');
    },
  };
});

export default useActiveConversation;
