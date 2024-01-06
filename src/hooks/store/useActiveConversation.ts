import { create } from 'zustand';
import { ContactInterface } from '@/utils/contact.interface';

interface Contact {
  activeConversation: ContactInterface | null;
  setActiveConversation: (newConversation: ContactInterface) => void;
  clearActiveConversation: () => void;
}

const useActiveConversation = create<Contact>((set) => {
  const initalConversation = sessionStorage.getItem('activeConversation');

  return {
    activeConversation: initalConversation
      ? (JSON.parse(initalConversation) as ContactInterface)
      : null,

    setActiveConversation: (newConversation) => {
      sessionStorage.setItem(
        'activeConversation',
        JSON.stringify(newConversation)
      );

      set({ activeConversation: newConversation });
    },
    clearActiveConversation: () => {
      set({ activeConversation: null });
    },
  };
});

export default useActiveConversation;
