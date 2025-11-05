import React from 'react';
import { Thread } from '@/types/agent.types';
import { cn } from '@/utils/cn';
import { MessageSquare, Trash2 } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/UI/Button';

interface ThreadItemProps {
  thread: Thread;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  isActive,
  onClick,
  onDelete,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
        'hover:bg-accent',
        isActive && 'bg-accent border border-border'
      )}
    >
      <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground" />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{thread.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {formatDistance(new Date(thread.updatedAt), new Date(), { addSuffix: true })}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {thread.messageCount} {thread.messageCount === 1 ? 'message' : 'messages'}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  );
};

