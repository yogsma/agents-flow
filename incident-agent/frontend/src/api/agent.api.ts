import apiClient from './client';
import { MessageDto, MessageResponseDto } from '@/types/agent.types';

export const agentApi = {
  /**
   * Send a message to the agent (non-streaming)
   */
  chat: async (messageDto: MessageDto): Promise<MessageResponseDto> => {
    const response = await apiClient.post<MessageResponseDto>('/agent/chat', messageDto);
    return response.data;
  },

  /**
   * Get chat history for a specific thread
   */
  getHistory: async (threadId: string): Promise<MessageResponseDto[]> => {
    const response = await apiClient.get<MessageResponseDto[]>(`/agent/history/${threadId}`);
    return response.data;
  },

  /**
   * Build SSE stream URL for streaming messages
   */
  getStreamUrl: (threadId: string, content: string): string => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const params = new URLSearchParams({
      threadId,
      type: 'human',
      content,
    });
    return `${baseUrl}/api/agent/stream?${params.toString()}`;
  },
};

export default agentApi;

