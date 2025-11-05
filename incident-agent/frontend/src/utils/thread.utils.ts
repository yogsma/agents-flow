import { Thread } from '@/types/agent.types';

/**
 * Generate a thread title from the first message
 */
export const generateThreadTitle = (firstMessage: string, maxLength = 50): string => {
  if (!firstMessage) return 'New Conversation';
  
  const cleaned = firstMessage.trim().replace(/\n/g, ' ');
  if (cleaned.length <= maxLength) return cleaned;
  
  return cleaned.substring(0, maxLength).trim() + '...';
};

/**
 * Create a new thread ID
 */
export const generateThreadId = (): string => {
  return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sort threads by most recent
 */
export const sortThreadsByRecent = (threads: Thread[]): Thread[] => {
  return [...threads].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};

/**
 * Format message content for display
 */
export const formatMessageContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (item.type === 'text') return item.text || '';
        if (item.type === 'image_url') return `[Image: ${item.imageUrl}]`;
        return '';
      })
      .join('\n');
  }
  
  return JSON.stringify(content);
};

