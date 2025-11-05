import React from 'react';
import { ThreadList } from '@/components/Threads/ThreadList';
import { useThreads } from '@/hooks/useThreads';
import { useChatStore } from '@/store/chatStore';

interface ThreadsPanelProps {
  onThreadChange: (threadId: string) => void;
}

export const ThreadsPanel: React.FC<ThreadsPanelProps> = ({ onThreadChange }) => {
  const { threads, createThread, deleteThread } = useThreads();
  const { activeThreadId, setActiveThreadId, clearMessages } = useChatStore();

  const handleNewThread = () => {
    const newThread = createThread('New Conversation');
    setActiveThreadId(newThread.id);
    clearMessages();
    onThreadChange(newThread.id);
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThreadId(threadId);
    clearMessages();
    onThreadChange(threadId);
  };

  const handleThreadDelete = (threadId: string) => {
    deleteThread(threadId);
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
      clearMessages();
      onThreadChange('');
    }
  };

  return (
    <ThreadList
      threads={threads}
      activeThreadId={activeThreadId}
      onThreadSelect={handleThreadSelect}
      onThreadDelete={handleThreadDelete}
      onNewThread={handleNewThread}
    />
  );
};

