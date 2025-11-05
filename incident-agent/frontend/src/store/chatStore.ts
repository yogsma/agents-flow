import { create } from 'zustand';
import { ChatMessage, StreamingState } from '@/types/agent.types';

interface ChatStore {
  messages: ChatMessage[];
  streamingState: StreamingState;
  activeThreadId: string | null;
  
  // Actions
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  appendToLastMessage: (content: string) => void;
  clearMessages: () => void;
  
  setStreamingState: (state: Partial<StreamingState>) => void;
  setActiveThreadId: (threadId: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  streamingState: {
    isStreaming: false,
    currentMessageId: null,
    error: null,
  },
  activeThreadId: null,

  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    })),
  
  appendToLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        messages[messages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + content,
        };
      }
      return { messages };
    }),
  
  clearMessages: () => set({ messages: [] }),
  
  setStreamingState: (newState) =>
    set((state) => ({
      streamingState: { ...state.streamingState, ...newState },
    })),
  
  setActiveThreadId: (threadId) => set({ activeThreadId: threadId }),
}));

