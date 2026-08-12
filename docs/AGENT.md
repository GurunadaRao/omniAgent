# Omni Agent

## Project Goal

Build a production-grade distributed multi-agent research system capable of converting a natural language request into executable tasks, executing them in parallel, and generating a structured report.

---

# Core Principles

- Modular
- Strong typing
- SOLID principles
- Clean Architecture
- Event Driven
- Dependency Injection
- No business logic inside controllers
- Small reusable services
- High testability

---

# Folder Ownership

### Layer 1: Planning Layer (`planner-service`)
**Owner**: Member 1

**Responsibilities**
- Query Decomposition & Planning
- Prompt Engineering
- RAG & Vector DB Retrieval
- Task Graph (DAG) Construction

*Never modify Execution Service.*

---

### Layer 2: Execution Layer (`execution-service`)
**Owner**: Member 2

**Responsibilities**
- BullMQ Queue Orchestration
- Distributed Redis Lock Management
- Workers (Web, Browser, LLM)
- Task Scheduler & Retry Engine
- Dead Letter Queue (DLQ) Handling
- Central Tool Registry Integration

*Never place planning logic here.*

---

### Layer 3: Citation & Summariser Layer (`report-service`)
**Owner**: Member 3

**Responsibilities**
- Merging Intermediate Worker Results
- Citation Extraction & Deduplication
- Summary & Report Synthesis
- Output Generation (Markdown, HTML, PDF)

*Never execute worker tasks here.*

---

# Coding Standards

- Use TypeScript only.
- No `any`.
- Prefer interfaces over classes where possible.
- One responsibility per file.
- Functions should remain under ~80 lines where practical.
- Use async/await.
- Never block the event loop.
- Handle every promise rejection.

---

# Naming

- **Folders**: lowercase
- **Files**: camelCase.ts
- **Classes**: PascalCase
- **Interfaces**: IWorker
- **Enums**: WorkerType
- **Constants**: UPPER_CASE

---

# Worker Rules

- Every worker must extend `BaseWorker`.
- Every worker returns:
  ```typescript
  {
      success: boolean;
      output: any;
      metadata: any;
      executionTime: number;
      citations: string[];
  }
  ```
- Workers never call OpenAI directly.
- Workers use `ToolRegistry`.

---

# Tool Registry

- Every external SDK must be wrapped.
- Never call SDKs directly.

**Correct**:
Worker -> ToolRegistry -> OpenAI

**Wrong**:
Worker -> OpenAI

---

# Queue Rules

Every task must:
1. Validate input
2. Acquire lock
3. Execute
4. Save Result
5. Release lock
6. Emit Event

---

# Error Handling

- **Retries**: Exponential Backoff
- **Dead Letter Queue**
- **Logging**: Structured Errors
- *Never swallow exceptions.*

---

# Logging

Every important action should log:
- Task ID
- Worker
- Execution Time
- Result
- Failure
- Retry Count

---

# Git Workflow

- Branches: `main`, `development`, `feature/planner`, `feature/execution`, `feature/report`
- Use Pull Requests only.

---

# AI Instructions

When generating code:
- Follow existing architecture.
- Never duplicate logic.
- Reuse shared interfaces.
- Keep services independent.
- Preserve module boundaries.
- Add comments only where necessary.
- Produce production-ready TypeScript.
- Avoid introducing tight coupling.
- Prefer composition over inheritance.
- Never break public interfaces.
