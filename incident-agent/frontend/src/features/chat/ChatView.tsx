import React, { useEffect } from 'react';
import { ChatMessages } from '@/components/Chat/ChatMessages';
import { ChatInput } from '@/components/Chat/ChatInput';
import { useChatStore } from '@/store/chatStore';
import { useChat } from '@/hooks/useChat';
import { useAgentStream } from '@/hooks/useAgentStream';
import { useThreads } from '@/hooks/useThreads';
import { generateThreadTitle } from '@/utils/thread.utils';

interface ChatViewProps {
  threadId: string | null;
}

export const ChatView: React.FC<ChatViewProps> = ({ threadId }) => {
  const { messages, streamingState, addMessage } = useChatStore();
  const { isLoadingHistory, loadHistory } = useChat(threadId);
  const { startStream, stopStream } = useAgentStream();
  const { incrementMessageCount, getThread, updateThread } = useThreads();

  // Load history when thread changes
  useEffect(() => {
    if (threadId) {
      loadHistory();
    }
  }, [threadId]);

  const handleSendMessage = (content: string) => {
    if (!threadId) return;

    // Add user message to store
    const userMessage = {
      id: `human_${Date.now()}`,
      type: 'human' as const,
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Update thread title if it's the first message
    const thread = getThread(threadId);
    if (thread && thread.messageCount === 0) {
      const title = generateThreadTitle(content);
      updateThread(threadId, { title });
    }

    // Increment message count
    incrementMessageCount(threadId);

    // Start streaming response
    startStream(threadId, content);
  };

  const handleStopStreaming = () => {
    stopStream();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden px-4">
        <ChatMessages messages={messages} isLoading={isLoadingHistory} />
      </div>

      {/* Error Display */}
      {streamingState.error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm">
          Error: {streamingState.error}
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSend={handleSendMessage}
            disabled={!threadId || isLoadingHistory}
            isStreaming={streamingState.isStreaming}
            onStopStreaming={handleStopStreaming}
            placeholder={
              threadId
                ? 'Type your message...'
                : 'Select a thread or create a new one to start chatting'
            }
          />
        </div>
      </div>
    </div>
  );
};

