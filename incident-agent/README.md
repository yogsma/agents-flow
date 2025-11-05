# Incident Agent

A full-stack AI agent application with a NestJS backend and React frontend, featuring real-time streaming, thread management, and modern UI.

## Project Structure

This is a monorepo containing:

- **Backend** (`/backend`): NestJS application with LangChain agent integration
- **Frontend** (`/frontend`): React + Vite dashboard with real-time streaming

```
incident-agent/
├── backend/               # Backend (NestJS + LangChain)
│   ├── src/
│   │   ├── agent/        # Agent implementation (React agent pattern)
│   │   ├── api/          # API controllers and services
│   │   └── messaging/    # Redis messaging for SSE
│   └── package.json
├── frontend/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # Reusable components
│   │   ├── features/     # Feature modules
│   │   ├── hooks/        # Custom React hooks
│   │   └── store/        # Zustand stores
│   └── package.json
├── dev-start.sh          # Development startup script
└── README.md             # This file
```

## Features

### Backend
- 🤖 **LangChain Agent**: ReAct agent pattern with OpenAI/Google GenAI
- 💾 **PostgreSQL Checkpointing**: Persistent conversation history
- 🔴 **Redis Streaming**: Server-Sent Events (SSE) for real-time responses
- 🔌 **REST API**: NestJS controllers with Swagger documentation
- 🧵 **Thread Management**: Multi-conversation support with history

### Frontend
- 🚀 **Real-time Streaming**: SSE-based streaming responses
- 💬 **Thread Management**: Create, select, and manage conversations
- 📝 **Rich Message Display**: Markdown rendering with syntax highlighting
- 🎨 **Modern UI**: Tailwind CSS + shadcn/ui components
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **State Management**: Zustand + TanStack Query
- 💾 **Persistent Storage**: Thread history in localStorage

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Redis server
- OpenAI API key or Google GenAI API key

## Quick Start

### 1. Backend Setup

Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

Configure environment variables (create `.env` file):

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/incident_agent

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# AI Provider (choose one)
OPENAI_API_KEY=your_openai_key
# OR
GOOGLE_API_KEY=your_google_key

# Server
PORT=3001
```

Run database migrations (if any):

```bash
cd backend
npm run build
```

Start the backend:

```bash
# Development
cd backend
npm run start:dev

# Production
cd backend
npm run start:prod
```

Backend will run on `http://localhost:3001`

### 2. Frontend Setup

Install frontend dependencies:

```bash
cd frontend
npm install
```

Configure environment (create `frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Agent Endpoints

#### POST /api/agent/chat
Send a message to the agent (non-streaming)

**Request:**
```json
{
  "threadId": "thread_123",
  "type": "human",
  "content": [
    {
      "type": "text",
      "text": "Your message here"
    }
  ]
}
```

**Response:**
```json
{
  "id": "msg_123",
  "type": "ai",
  "content": "Agent response"
}
```

#### GET /api/agent/stream
Server-Sent Events endpoint for streaming responses

**Query Parameters:**
- `threadId`: Thread identifier
- `type`: Message type (always 'human')
- `content`: Message content

**Response:** SSE stream with message chunks

#### GET /api/agent/history/:threadId
Get conversation history for a thread

**Response:**
```json
[
  {
    "id": "msg_1",
    "type": "human",
    "content": "Hello"
  },
  {
    "id": "msg_2",
    "type": "ai",
    "content": "Hi! How can I help?"
  }
]
```

## Development

### Backend Development

```bash
cd backend

# Run in watch mode
npm run start:dev

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint
npm run lint

# Format
npm run format
```

### Frontend Development

```bash
cd frontend

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Architecture

### Backend Architecture

```
┌─────────────────────────────────────────────┐
│           NestJS Application                │
├─────────────────────────────────────────────┤
│  Controllers (REST API)                     │
│    ├── AgentController                      │
│    │   ├── POST /chat                       │
│    │   ├── GET /stream (SSE)                │
│    │   └── GET /history/:threadId           │
├─────────────────────────────────────────────┤
│  Services                                   │
│    ├── AgentService                         │
│    │   ├── chat()                           │
│    │   ├── stream()                         │
│    │   └── getHistory()                     │
│    └── RedisService                         │
│        ├── publish()                        │
│        └── subscribe()                      │
├─────────────────────────────────────────────┤
│  Agent Layer (LangChain)                    │
│    ├── ReactAgent                           │
│    │   ├── AgentFactory                     │
│    │   └── PostgresSaver (Checkpointing)    │
├─────────────────────────────────────────────┤
│  External Services                          │
│    ├── PostgreSQL (History)                 │
│    ├── Redis (Pub/Sub)                      │
│    └── OpenAI/Google GenAI (LLM)           │
└─────────────────────────────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────────────┐
│           React Application                 │
├─────────────────────────────────────────────┤
│  Features                                   │
│    ├── ChatView                             │
│    │   ├── ChatMessages                     │
│    │   └── ChatInput                        │
│    └── ThreadsPanel                         │
│        └── ThreadList                       │
├─────────────────────────────────────────────┤
│  State Management                           │
│    ├── Zustand Stores                       │
│    │   ├── chatStore                        │
│    │   ├── threadsStore                     │
│    │   └── settingsStore                    │
│    └── TanStack Query                       │
│        ├── Chat history queries             │
│        └── Message mutations                │
├─────────────────────────────────────────────┤
│  Custom Hooks                               │
│    ├── useAgentStream (SSE)                 │
│    ├── useChat                              │
│    └── useThreads                           │
├─────────────────────────────────────────────┤
│  API Layer                                  │
│    ├── apiClient (Axios)                    │
│    └── agentApi                             │
└─────────────────────────────────────────────┘
```

## Technology Stack

### Backend
- **Framework**: NestJS 11
- **Language**: TypeScript
- **AI Framework**: LangChain + LangGraph
- **LLM**: OpenAI / Google GenAI
- **Database**: PostgreSQL (with @langchain/langgraph-checkpoint-postgres)
- **Cache/Messaging**: Redis
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **State Management**: Zustand + TanStack Query
- **UI Components**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Markdown**: react-markdown + remark-gfm
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Configuration

### Backend Environment Variables

See `.env.example` for all available options:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT`: Redis configuration
- `OPENAI_API_KEY` or `GOOGLE_API_KEY`: LLM provider
- `PORT`: Backend server port (default: 3001)

### Frontend Environment Variables

- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:3001/api)

## Deployment

### Backend Deployment

1. Build the application:
```bash
cd backend
npm run build
```

2. Set environment variables in production

3. Run migrations (if any)

4. Start the server:
```bash
cd backend
npm run start:prod
```

### Frontend Deployment

1. Build the application:
```bash
cd frontend
npm run build
```

2. Deploy the `frontend/dist` folder to your hosting service (Vercel, Netlify, etc.)

3. Set `VITE_API_BASE_URL` to your production backend URL

## Troubleshooting

### Backend Issues

**Database connection errors:**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Redis connection errors:**
- Verify Redis is running
- Check REDIS_HOST and REDIS_PORT

**LLM API errors:**
- Verify API key is set
- Check API quota/limits

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on port 3001
- Check CORS configuration in backend
- Verify VITE_API_BASE_URL

**SSE streaming not working:**
- Check browser console for errors
- Verify Redis service is running
- Check backend SSE endpoint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

UNLICENSED - Private project

## Support

For issues and questions:
1. Check the documentation in `/frontend/README.md` for frontend-specific issues
2. Review backend logs for API errors
3. Check Redis and PostgreSQL connections
4. Verify environment variables are set correctly
