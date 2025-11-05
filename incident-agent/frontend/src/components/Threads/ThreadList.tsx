import React from 'react';
import { Thread } from '@/types/agent.types';
import { ThreadItem } from './ThreadItem';
import { ScrollArea } from '@/components/UI/ScrollArea';
import { Button } from '@/components/UI/Button';
import { Plus } from 'lucide-react';

interface ThreadListProps {
  threads: Thread[];
  activeThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
  onThreadDelete: (threadId: string) => void;
  onNewThread: () => void;
}

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  activeThreadId,
  onThreadSelect,
  onThreadDelete,
  onNewThread,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Button onClick={onNewThread} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        {threads.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 px-4">
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Click "New Chat" to start</p>
          </div>
        ) : (
          <div className="space-y-1">
            {threads.map((thread) => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                isActive={thread.id === activeThreadId}
                onClick={() => onThreadSelect(thread.id)}
                onDelete={(e) => {
                  e.stopPropagation();
                  onThreadDelete(thread.id);
                }}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

