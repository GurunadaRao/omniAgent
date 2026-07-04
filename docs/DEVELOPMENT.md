# Development Guide

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Services
Ensure Docker is running, then start external databases:
```bash
docker compose up -d
```

### 3. Run Development Server
```bash
npm run dev
```

## Environment Variables

Create `.env` files in root and/or individual service subfolders:
- `MONGODB_URI`: Connection string for MongoDB (default: `mongodb://localhost:27017/omni-agent`).
- `REDIS_HOST`: Redis host name (default: `localhost`).
- `REDIS_PORT`: Redis port (default: `6379`).
- `OPENAI_API_KEY`: API token for OpenAI services.
- `TAVILY_API_KEY`: Search API token.
