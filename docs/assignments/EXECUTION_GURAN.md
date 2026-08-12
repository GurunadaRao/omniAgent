# V1 Assignment: Execution Layer & Tool Registry

**Assignee**: Guran  
**Layer / Domain**: Execution Layer (`apps/execution-service`) & SDK Tool Registry (`packages/sdk`)  
**Target Release**: Version 1 (Core Automation - Production Ready)

---

## 📌 Primary Goals
Guran is responsible for consuming tasks from Redis BullMQ queues, orchestrating worker execution locks and retries, executing tool tasks via the unified `ToolRegistry`, saving intermediate task outputs into MongoDB, and driving DAG dependency resolution until the full workflow completes.

---

## 📋 Actionable Task List

### 1. BullMQ Queue & Worker Orchestration (`apps/execution-service`)
- [ ] **Queue Consumer Pipeline**: Set up resilient BullMQ worker process listening on `omni-task-queue`.
- [ ] **Concurrency & Locking**: Configure worker concurrency limits and job locking duration (`lockDuration`) to prevent worker timeouts and duplicate task processing.
- [ ] **Retry & DLQ Logic**: Implement exponential backoff retry strategies (max 3 retries) and route persistently failing tasks to Dead Letter Queue (DLQ).
- [ ] **Task Lifecycle Transitions**: Update task status in MongoDB (`pending` -> `running` -> `completed` / `failed`).

### 2. Tool Registry & V1 Worker Pool Implementation (`packages/sdk` & `apps/execution-service`)
- [ ] **ToolRegistry Enforcement**: Ensure all workers invoke third-party tools via `ToolRegistry.executeTool()` (strict policy: no direct SDK HTTP calls inside worker bodies).
- [ ] **Web Worker**: Implement worker integration for Tavily & Serper API search and Firecrawl page scraping.
- [ ] **Browser Worker**: Implement worker using Playwright for basic web session navigation and text extraction.
- [ ] **GitHub Worker**: Implement worker using Octokit / GitHub REST API to read code files, repository tree context, and issues/PRs.
- [ ] **LLM Worker**: Implement worker to process intermediate task summaries and data extraction using OpenAI/Claude APIs.

### 3. Intermediate State & DAG Dependency Resolver (`packages/database` & `packages/events`)
- [ ] **Result Persistence**: Store worker execution outputs and metadata into MongoDB `Results` collection upon job completion.
- [ ] **DAG Resolution Engine**:
  - Upon task completion, fetch parent-dependent child tasks for the current `projectId`.
  - Mark dependency requirements satisfied and automatically enqueue newly unlocked tasks onto BullMQ.
- [ ] **Completion Trigger**: Detect when all tasks for a `projectId` have reached terminal states (`completed` / `failed`) and emit `PROJECT_COMPLETED` event.

### 4. Quality Assurance & Production Readiness
- [ ] **Unit Tests**: Mock external SDKs to test worker execution logic and error handlers.
- [ ] **Integration Tests**: Verify DAG state resolution logic when parent tasks complete.
- [ ] **Observability**: Log execution duration, tool failures, and queue latency with Winston logger.

---

## 🔗 Key Dependencies & Interfaces
- **Inputs from Surya (Planning)**: Consumes `Task` objects enqueued by `planner-service`.
- **Outputs to Bhargav (Citation/Summariser)**: Emits `PROJECT_COMPLETED` event and saves worker outputs to `Results` collection.
