import React from 'react';
import { Button } from '@/components/UI/Button';
import { Menu, Settings } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export const Header: React.FC = () => {
  const { toggleSidebar } = useSettingsStore();

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Incident Agent</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

