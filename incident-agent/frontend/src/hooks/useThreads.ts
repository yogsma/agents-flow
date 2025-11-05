import { useThreadsStore } from '@/store/threadsStore';
import { Thread } from '@/types/agent.types';
import { generateThreadId, sortThreadsByRecent } from '@/utils/thread.utils';
import { useMemo } from 'react';

export const useThreads = () => {
  const { threads, addThread, updateThread, deleteThread, getThread } = useThreadsStore();

  const sortedThreads = useMemo(() => {
    return sortThreadsByRecent(threads);
  }, [threads]);

  const createThread = (title: string): Thread => {
    const newThread: Thread = {
      id: generateThreadId(),
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
    };
    addThread(newThread);
    return newThread;
  };

  const incrementMessageCount = (threadId: string) => {
    const thread = getThread(threadId);
    if (thread) {
      updateThread(threadId, {
        messageCount: thread.messageCount + 1,
        updatedAt: new Date(),
      });
    }
  };

  return {
    threads: sortedThreads,
    createThread,
    updateThread,
    deleteThread,
    getThread,
    incrementMessageCount,
  };
};

