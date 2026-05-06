import { create } from 'zustand';

interface UIStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  activeModal: string | null;
  setIsLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null;
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIStore>(set => ({
  isLoading: false,
  isSidebarOpen: false,
  activeModal: null,
  notification: null,

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  toggleSidebar: () =>
    set(state => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  openModal: (modalId: string) =>
    set({
      activeModal: modalId,
    }),

  closeModal: () =>
    set({
      activeModal: null,
    }),

  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') =>
    set({
      notification: {
        show: true,
        message,
        type,
      },
    }),

  hideNotification: () =>
    set({
      notification: null,
    }),
}));
