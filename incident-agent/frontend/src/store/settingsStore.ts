import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  apiBaseUrl: string;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setApiBaseUrl: (url: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarCollapsed: false,
      apiBaseUrl: '/api',

      setTheme: (theme) => set({ theme }),
      
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setApiBaseUrl: (url) => set({ apiBaseUrl: url }),
    }),
    {
      name: 'settings-storage',
    }
  )
);

