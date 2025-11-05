# Incident Agent Frontend

A modern, full-featured React dashboard for the Incident Agent with real-time streaming, thread management, and a beautiful UI.

## Features

- 🚀 **Real-time Streaming**: SSE-based streaming responses from the AI agent
- 💬 **Thread Management**: Create, select, and manage multiple conversation threads
- 📝 **Rich Message Display**: Markdown rendering with syntax highlighting
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Performance Optimized**: Zustand for state management, TanStack Query for data fetching
- 🔄 **Auto-scroll**: Automatically scrolls to latest messages
- 💾 **Persistent Storage**: Thread history saved in local storage

## Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **State Management**: Zustand + TanStack Query (React Query)
- **UI Library**: Tailwind CSS + shadcn/ui components
- **SSE Client**: EventSource API with reconnection logic
- **Form Handling**: React Hook Form + Zod validation
- **Date Handling**: date-fns
- **Markdown**: react-markdown with remark-gfm

## Prerequisites

- Node.js 18+ and npm
- Backend server running on port 3001 (see backend README)

## Installation

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Configure the API URL in `.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

The development server includes:
- Hot Module Replacement (HMR)
- Proxy to backend API at port 3001
- TypeScript type checking
- ESLint linting

## Building for Production

Build the production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client and agent API methods
│   │   ├── client.ts
│   │   └── agent.api.ts
│   ├── components/       # Reusable UI components
│   │   ├── Chat/         # Chat-specific components
│   │   ├── Layout/       # Layout components
│   │   ├── Threads/      # Thread management components
│   │   └── UI/           # Base UI components (Button, Input, etc.)
│   ├── features/         # Feature modules
│   │   ├── chat/         # Chat view
│   │   └── threads/      # Thread panel
│   ├── hooks/            # Custom React hooks
│   │   ├── useAgentStream.ts
│   │   ├── useChat.ts
│   │   └── useThreads.ts
│   ├── store/            # Zustand stores
│   │   ├── chatStore.ts
│   │   ├── threadsStore.ts
│   │   └── settingsStore.ts
│   ├── types/            # TypeScript types
│   │   └── agent.types.ts
│   ├── utils/            # Helper functions
│   │   ├── cn.ts
│   │   └── thread.utils.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies
```

## API Integration

The frontend integrates with the following backend endpoints:

### 1. POST /api/agent/chat
Non-streaming chat endpoint for sending messages.

**Request:**
```typescript
{
  threadId: string;
  type: 'human';
  content: MessageContentDto[];
}
```

**Response:**
```typescript
{
  id: string;
  type: 'human' | 'ai' | 'tool';
  content: any;
}
```

### 2. GET /api/agent/stream
Server-Sent Events (SSE) endpoint for streaming responses.

**Query Parameters:**
- `threadId`: Thread identifier
- `type`: Message type (always 'human')
- `content`: Message content

**SSE Messages:**
```typescript
{
  type: 'message' | 'done' | 'error';
  data: {
    id: string;
    type?: 'ai' | 'tool';
    content: string;
  };
}
```

### 3. GET /api/agent/history/:threadId
Retrieve conversation history for a thread.

**Response:**
```typescript
Array<{
  id: string;
  type: 'human' | 'ai' | 'tool';
  content: any;
}>
```

## State Management

### Zustand Stores

**chatStore**: Manages current conversation state
- Messages in the active thread
- Streaming state (isStreaming, currentMessageId, error)
- Active thread ID

**threadsStore**: Manages thread list (persisted to localStorage)
- Thread list with metadata
- CRUD operations for threads

**settingsStore**: User preferences (persisted to localStorage)
- Theme (light/dark/system)
- Sidebar collapsed state
- API base URL

### TanStack Query

Used for server state management:
- Caching chat history
- Background refetching
- Optimistic updates
- Error handling and retries

## Key Components

### ChatView
Main chat interface component that:
- Displays messages
- Handles message input
- Manages streaming responses
- Loads conversation history

### ThreadsPanel
Thread management sidebar that:
- Lists all conversation threads
- Allows creating new threads
- Handles thread selection and deletion
- Shows thread metadata

### MessageBubble
Individual message component with:
- User/AI differentiation
- Markdown rendering for AI messages
- Timestamp display
- Streaming indicator

### ChatInput
Message input component featuring:
- Multi-line text input with auto-resize
- Send button with keyboard shortcut (Enter)
- Stop streaming button when active
- Disabled state handling

## Custom Hooks

### useAgentStream
Manages SSE connections for streaming responses:
- Establishes EventSource connection
- Handles incoming messages
- Auto-reconnection on errors
- Cleanup on unmount

### useChat
Handles chat operations:
- Fetches conversation history
- Sends non-streaming messages
- Integrates with TanStack Query
- Error handling

### useThreads
Manages thread operations:
- CRUD operations for threads
- Thread sorting by recency
- Message count tracking
- Thread title generation

## Styling

The app uses Tailwind CSS with a custom design system:

- **Colors**: CSS variables for easy theming
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and animations
- **Custom Scrollbars**: Styled for better UX

## Development Tips

### Adding New Components

1. Create component in appropriate directory
2. Use `cn()` utility for className merging
3. Follow existing patterns for props and types
4. Add proper TypeScript types

### Working with State

```typescript
// Access store
const { messages, addMessage } = useChatStore();

// Update store
addMessage({ id, type, content, timestamp });

// Subscribe to changes (automatic with Zustand hooks)
```

### Making API Calls

```typescript
// Using TanStack Query
const { data, isLoading } = useQuery({
  queryKey: ['chat-history', threadId],
  queryFn: () => agentApi.getHistory(threadId),
});

// Using mutations
const mutation = useMutation({
  mutationFn: agentApi.chat,
  onSuccess: (data) => { /* handle success */ },
});
```

## Troubleshooting

### Backend Connection Issues

If you see connection errors:
1. Ensure backend is running on port 3001
2. Check CORS configuration in backend
3. Verify API base URL in `.env`

### SSE Stream Not Working

1. Check browser console for errors
2. Verify SSE endpoint in Network tab
3. Ensure backend SSE headers are correct
4. Check Redis service is running (backend requirement)

### Styling Issues

1. Ensure Tailwind is properly configured
2. Check CSS variable values in `index.css`
3. Verify imports are using `@/` alias

## Performance Optimization

- **React.memo**: Used for expensive components
- **Virtual Scrolling**: Can be added for very long message lists
- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Can be added for routes
- **Debouncing**: Used in input components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

When contributing:
1. Follow existing code patterns
2. Add TypeScript types for all props
3. Use Tailwind for styling (no inline styles)
4. Test on both desktop and mobile
5. Ensure dark mode works properly

## License

Same as parent project

