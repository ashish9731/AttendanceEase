import { create } from 'zustand';

type Page = 'home' | 'application' | 'dashboard';

interface NavigationState {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentPage: 'home',
  navigate: (page) => set({ currentPage: page }),
}));