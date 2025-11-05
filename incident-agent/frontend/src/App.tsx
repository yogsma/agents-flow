import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { ThreadsPanel } from '@/features/threads/ThreadsPanel';
import { ChatView } from '@/features/chat/ChatView';
import { useChatStore } from '@/store/chatStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { activeThreadId } = useChatStore();

  const handleThreadChange = (threadId: string) => {
    console.log('Thread changed:', threadId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout
        sidebar={<ThreadsPanel onThreadChange={handleThreadChange} />}
      >
        <ChatView threadId={activeThreadId} />
      </DashboardLayout>
    </QueryClientProvider>
  );
}

export default App;

