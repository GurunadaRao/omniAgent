# Project Structure

## Overview

```text
omni-agent/
├── apps/
│   ├── api/                  # Main Backend Server (Express, Routes, Controllers)
│   ├── planner-service/      # Member 1 (Task planning, prompt generation, RAG)
│   ├── execution-service/    # Member 2 (BullMQ, workers, execution coordination)
│   └── report-service/       # Member 3 (Result aggregation, PDF formatting)
├── packages/
│   ├── shared/               # Shared TS types, logger, errors, utils
│   ├── database/             # MongoDB schema definitions & Redis configurations
│   ├── sdk/                  # Wrapped external SDKs (OpenAI, Serper, Tavily, etc.)
│   └── events/               # Event schemas shared across microservices
├── infrastructure/           # Docker, Kubernetes, Nginx configuration files
├── scripts/                  # Development scripts (seeding, migration, clean)
└── docs/                     # Comprehensive documentation
```

### Module Descriptions

- **apps/api**: Exposes public REST API endpoints to register tasks, query status, and fetch reports.
- **apps/planner-service**: Transforms unstructured natural language requests into structured DAGs of tasks.
- **apps/execution-service**: Manages BullMQ workers to consume tasks and execute them using the SDKs.
- **apps/report-service**: Pulls task outputs and structures them into markdown reports with citations.
