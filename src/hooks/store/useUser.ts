import { create } from 'zustand';
import { UserInterface } from '@/schemas/user/user.schema';

interface User {
  user: UserInterface | null;
  setUser: (newUser: UserInterface) => void;
}

const useUser = create<User>((set) => {
  const initialUser = localStorage.getItem('user');

  return {
    user: initialUser ? JSON.parse(initialUser) : null,
    setUser: (newUser) => {
      localStorage.setItem('user', JSON.stringify(newUser));
      set({ user: newUser });
    },
  };
});

export default useUser;
