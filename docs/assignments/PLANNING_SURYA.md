# V1 Assignment: Planning Layer & Gateway

**Assignee**: Surya  
**Layer / Domain**: Planning Layer (`apps/planner-service`) & API Gateway (`apps/api`)  
**Target Release**: Version 1 (Core Automation - Production Ready)

---

## 📌 Primary Goals
Surya is responsible for taking natural language requests from the user, validating input, analyzing intent using LLMs, constructing a valid Directed Acyclic Graph (DAG) of tasks, persisting the initial project state in MongoDB, and enqueuing executable root tasks onto Redis BullMQ.

---

## 📋 Actionable Task List

### 1. API Gateway Query Ingestion (`apps/api`)
- [ ] **Endpoint Setup**: Build `POST /query` Express handler to accept query text, priority, and metadata.
- [ ] **Schema Validation**: Add Zod validation schemas for input query payload.
- [ ] **Project Session Initialization**: Generate a unique `projectId` and initial Project status (`planning`).
- [ ] **Status API Endpoints**:
  - Implement `GET /projects/:id` for client polling on overall DAG execution state.
  - Implement `GET /tasks/:id` to fetch detailed states of specific sub-tasks.

### 2. Planner Service & LLM Prompting (`apps/planner-service`)
- [ ] **Prompt Engineering Engine**: Design structured system prompts that instruct LLMs to break down complex queries into discrete, executable steps.
- [ ] **DAG Schema Validator**: Implement schema validation to verify that LLM outputs strictly form a valid Directed Acyclic Graph (no cyclic dependencies, valid worker type assignments).
- [ ] **Worker Type Assignment**: Ensure each sub-task is tagged with a valid V1 worker type (`WEB`, `BROWSER`, `GITHUB`, `LLM`).
- [ ] **Fallback & Retry Handler**: Add error-handling logic to re-prompt the LLM or apply fallback templates if JSON/DAG parsing fails.

### 3. Database Persistence & Enqueuing (`packages/database` & `packages/events`)
- [ ] **Mongo Persistence**: Save the generated `Project` record and array of `Task` documents into MongoDB using the shared repository pattern.
- [ ] **Root Task Identification**: Identify root tasks (tasks with zero parent dependencies `dependencies: []`).
- [ ] **Queue Dispatch**: Publish root tasks to the designated BullMQ Redis queue (`omni-task-queue`).
- [ ] **State Transition Event**: Update project status to `executing` and emit `PROJECT_STARTED` event.

### 4. Quality Assurance & Production Readiness
- [ ] **Unit Tests**: Add unit tests for DAG structure validation and prompt parsing.
- [ ] **Integration Tests**: Test end-to-end flow from `POST /query` to BullMQ enqueueing.
- [ ] **Error Tracing**: Integrate structured logging with Winston to trace planning latency and LLM token counts.

---

## 🔗 Key Dependencies & Interfaces
- **Outputs to Guran (Execution)**: Pushes validated `Task` items into Redis BullMQ.
- **Shared Schemas**: Uses `Task` and `Project` Mongoose models from `packages/database`.
