import { useEffect, useRef, useState } from 'react';
import { agentApi } from '@/api/agent.api';
import { SseMessage } from '@/types/agent.types';
import { useChatStore } from '@/store/chatStore';

interface UseAgentStreamOptions {
  onMessage?: (message: SseMessage) => void;
  onError?: (error: Error) => void;
  onDone?: () => void;
}

export const useAgentStream = (options?: UseAgentStreamOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const { setStreamingState, addMessage, appendToLastMessage } = useChatStore();

  const startStream = (threadId: string, content: string) => {
    // Close existing connection
    stopStream();

    const url = agentApi.getStreamUrl(threadId, content);
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    setStreamingState({ isStreaming: true, error: null });

    // Add initial AI message placeholder
    const aiMessageId = `ai_${Date.now()}`;
    addMessage({
      id: aiMessageId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    });

    setStreamingState({ currentMessageId: aiMessageId });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const message: SseMessage = JSON.parse(event.data);
        
        if (message.type === 'message' && message.data.content) {
          appendToLastMessage(message.data.content);
          options?.onMessage?.(message);
        } else if (message.type === 'done') {
          stopStream();
          options?.onDone?.();
        } else if (message.type === 'error') {
          const error = new Error((message.data as any).message || 'Stream error');
          setStreamingState({ error: error.message, isStreaming: false });
          options?.onError?.(error);
          stopStream();
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      const errorMessage = 'Connection error occurred';
      setStreamingState({ error: errorMessage, isStreaming: false });
      options?.onError?.(new Error(errorMessage));
      stopStream();
    };
  };

  const stopStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
    setStreamingState({ isStreaming: false, currentMessageId: null });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  return {
    startStream,
    stopStream,
    isConnected,
  };
};

