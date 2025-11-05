import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Thread } from '@/types/agent.types';

interface ThreadsStore {
  threads: Thread[];
  
  // Actions
  addThread: (thread: Thread) => void;
  updateThread: (id: string, updates: Partial<Thread>) => void;
  deleteThread: (id: string) => void;
  getThread: (id: string) => Thread | undefined;
  setThreads: (threads: Thread[]) => void;
}

export const useThreadsStore = create<ThreadsStore>()(
  persist(
    (set, get) => ({
      threads: [],

      addThread: (thread) =>
        set((state) => ({
          threads: [thread, ...state.threads],
        })),

      updateThread: (id, updates) =>
        set((state) => ({
          threads: state.threads.map((thread) =>
            thread.id === id ? { ...thread, ...updates, updatedAt: new Date() } : thread
          ),
        })),

      deleteThread: (id) =>
        set((state) => ({
          threads: state.threads.filter((thread) => thread.id !== id),
        })),

      getThread: (id) => {
        return get().threads.find((thread) => thread.id === id);
      },

      setThreads: (threads) => set({ threads }),
    }),
    {
      name: 'threads-storage',
    }
  )
);

