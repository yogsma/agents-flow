import React from 'react';
import { cn } from '@/utils/cn';
import { useSettingsStore } from '@/store/settingsStore';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { sidebarCollapsed } = useSettingsStore();

  return (
    <>
      {/* Overlay for mobile */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => useSettingsStore.getState().toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50',
          'w-80 bg-background border-r border-border',
          'transform transition-transform duration-200 ease-in-out',
          'lg:transform-none',
          sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        {children}
      </aside>
    </>
  );
};

