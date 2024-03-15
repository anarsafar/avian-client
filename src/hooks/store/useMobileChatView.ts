import { create } from 'zustand';

interface Mobile {
  isMobileChatOpen: boolean;
  mobileChatOpen: () => void;
  mobileChatClose: () => void;
}

const useMobileChatView = create<Mobile>((set) => {
  return {
    isMobileChatOpen: false,
    mobileChatOpen: () => set({ isMobileChatOpen: true }),
    mobileChatClose: () => set({ isMobileChatOpen: false }),
  };
});

export default useMobileChatView;
