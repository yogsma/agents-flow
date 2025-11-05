#!/bin/bash

# Development startup script for Incident Agent
# Starts both backend and frontend in development mode

echo "🚀 Starting Incident Agent Development Environment"
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Dependencies installed"
echo ""
echo "Starting services..."
echo "  - Backend:  http://localhost:3001"
echo "  - Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start backend and frontend concurrently
trap 'kill 0' EXIT

# Start backend in background
cd backend && npm run start:dev &

# Give backend a moment to start
sleep 2

# Start frontend
cd ./frontend && npm run dev

