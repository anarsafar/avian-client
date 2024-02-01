import { create } from 'zustand';
import { ContactInterface } from '@/utils/contact.interface';

interface Contact {
  activeContact: ContactInterface | null;
  setActiveContact: (newActiveContact: ContactInterface) => void;
  clearActiveContact: () => void;
}

const useActiveContact = create<Contact>((set) => {
  const initialActiveContact = sessionStorage.getItem('activeContact');

  return {
    activeContact: initialActiveContact
      ? (JSON.parse(initialActiveContact) as ContactInterface)
      : null,

    setActiveContact: (newActiveContact) => {
      sessionStorage.setItem('activeContact', JSON.stringify(newActiveContact));

      set({ activeContact: newActiveContact });
    },
    clearActiveContact: () => {
      sessionStorage.removeItem('activeContact');
      set({ activeContact: null });
    },
  };
});

export default useActiveContact;
