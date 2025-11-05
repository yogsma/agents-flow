// Types matching backend DTOs

export interface MessageContentDto {
  type: 'text' | 'image_url';
  text?: string;
  imageUrl?: string;
  detail?: 'auto' | 'low' | 'high';
}

export interface MessageDto {
  threadId: string;
  type: 'human';
  content: MessageContentDto[];
}

export interface SseMessageDto {
  threadId: string;
  type: 'human';
  content: string;
}

export interface MessageResponseDto {
  id: string;
  type: 'human' | 'ai' | 'tool';
  content: any;
}

export interface SseMessage {
  data: {
    id: string;
    type?: 'ai' | 'tool';
    content: string;
  };
  type: string;
}

// Frontend-specific types
export interface Thread {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  type: 'human' | 'ai' | 'tool';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface StreamingState {
  isStreaming: boolean;
  currentMessageId: string | null;
  error: string | null;
}

