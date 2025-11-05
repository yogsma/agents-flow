import { useMutation, useQuery } from '@tanstack/react-query';
import { agentApi } from '@/api/agent.api';
import { MessageDto } from '@/types/agent.types';
import { useChatStore } from '@/store/chatStore';
import { formatMessageContent } from '@/utils/thread.utils';

export const useChat = (threadId: string | null) => {
  const { addMessage, setMessages } = useChatStore();

  // Fetch chat history
  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ['chat-history', threadId],
    queryFn: () => agentApi.getHistory(threadId!),
    enabled: !!threadId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Send message mutation (non-streaming)
  const sendMessageMutation = useMutation({
    mutationFn: (messageDto: MessageDto) => agentApi.chat(messageDto),
    onSuccess: (response) => {
      addMessage({
        id: response.id,
        type: response.type,
        content: formatMessageContent(response.content),
        timestamp: new Date(),
      });
    },
    onError: (error: any) => {
      console.error('Error sending message:', error);
      addMessage({
        id: `error_${Date.now()}`,
        type: 'ai',
        content: `Error: ${error.message || 'Failed to send message'}`,
        timestamp: new Date(),
      });
    },
  });

  // Load history into store when it changes
  const loadHistory = () => {
    if (history) {
      const messages = history.map((msg) => ({
        id: msg.id,
        type: msg.type,
        content: formatMessageContent(msg.content),
        timestamp: new Date(),
      }));
      setMessages(messages);
    }
  };

  return {
    history,
    isLoadingHistory,
    historyError,
    refetchHistory,
    loadHistory,
    sendMessage: sendMessageMutation.mutate,
    isSendingMessage: sendMessageMutation.isPending,
  };
};

