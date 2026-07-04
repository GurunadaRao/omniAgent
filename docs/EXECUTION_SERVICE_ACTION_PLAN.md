# Execution Service Implementation Plan (Member 2 Backlog)

**Author:** Lead Technical Product Manager  
**Role Scope:** Member 2 (Execution Service Owner)  
**Target Goal:** Production Launch of the Distributed Multi-Agent Execution Framework  

---

## 1. Product Vision & Mission
The **Execution Service** is the engine of Omni Agent. While Member 1 designs the queries and Member 3 compiles the output, you build the orchestration infrastructure that processes task dependencies, manages computing power, and safely wraps external services. 

Success is measured by:
- **Throughput**: Running up to 100 parallel tasks without thread starvation.
- **Resilience**: 99.9% task execution completion rate despite external API failures.
- **Latency**: Keeping overhead of queue and worker scheduling under 50ms per task.

---

## 2. Roadmap & Milestone Phases

```text
Milestone 1: Queue Foundation  ──>  Milestone 2: Worker Core  ──>  Milestone 3: Tool Registry  ──>  Milestone 4: Reliability & Scale
  (Redis, BullMQ, Locks)             (Base classes, Events)           (SDK Wrappers, sandboxing)       (DLQ, metrics, HPA)
```

### Milestone 1: Queue & Lock Infrastructure (Weeks 1-2)
*Focus: Configure reliable message passing and prevent duplicate processing.*

* **Task 1.1: BullMQ Connection & Redis Client Setup**
  * *Objective*: Standardize Redis client connection pools inside `packages/database/redis/` and configure BullMQ dashboard setups.
  * *Deliverable*: Robust retry/connection logic handles Redis restarts gracefully.
* **Task 1.2: Job Lifecycle Event System**
  * *Objective*: Set up BullMQ queue event listeners to hook into state transitions (`active`, `completed`, `failed`).
  * *Deliverable*: Outgoing events conform to types declared in `packages/events/queue-events.ts`.
* **Task 1.3: Task Lock Mechanism**
  * *Objective*: Implement a Redis-based locking mechanism to prevent two workers from processing the same task if network splits occur.

---

### Milestone 2: Worker Core & Lifecycle Engine (Weeks 3-4)
*Focus: Define the execution standard for specialized agents.*

* **Task 2.1: Abstract Base Worker Implementation**
  * *Objective*: Build `BaseWorker` enforcing the strict output shape defined in `docs/AGENT.md`:
    ```typescript
    export interface WorkerResult<T = any> {
      success: boolean;
      output: T;
      metadata: Record<string, any>;
      executionTime: number;
      citations: string[];
    }
    ```
* **Task 2.2: Concurrency & Sandbox Isolation**
  * *Objective*: Create isolated worker loops. For **Code Workers**, configure a isolated container sandbox or node VM2 instance to prevent code injection attacks on the host.
* **Task 2.3: Parallel Executors (`taskExecutor`, `parallelExecutor`)**
  * *Objective*: Build executors that resolve task dependencies, processing child jobs only when parent jobs succeed.

---

### Milestone 3: Tool Registry & SDK Integrations (Weeks 5-6)
*Focus: Control external integrations securely.*

* **Task 3.1: Tool Registry Setup**
  * *Objective*: Implement `ToolRegistry` and `ToolResolver`.
  * *Deliverable*: All worker tool invocations must route through the registry to allow central execution metrics recording.
* **Task 3.2: First-Class SDK Integrations**
  * *Objective*: Implement wrappers inside `packages/sdk/` for Tavily, OpenAI, Playwright, and Firecrawl.
* **Task 3.3: API Key Decryption Middleware**
  * *Objective*: Integrate AES-256 decryption utility to fetch and decrypt third-party developer API keys before running tasks.

---

### Milestone 4: Reliability, Monitoring, & Scaling (Weeks 7-8)
*Focus: Harden the service for production workloads.*

* **Task 4.1: Exponential Backoff & DLQ Router**
  * *Objective*: Configure BullMQ backoff policies. Route jobs that fail 3 consecutive times to the Dead Letter Queue (DLQ).
* **Task 4.2: Observability (Winston + OpenTelemetry)**
  * *Objective*: Implement structured JSON logs in Winston and inject trace/span IDs for cross-service tracking.
* **Task 4.3: Kubernetes Scaling manifests**
  * *Objective*: Write horizontal pod autoscaler (HPA) YAML scripts targeting memory/CPU thresholds for the worker pods.

---

## 3. Key Design Decisions & Guardrails

1. **Strict Boundary Adherence**: Do not implement prompt generation, vector embeddings database seeding, or final report layouts.
2. **Defensive Resource Management**: Always set explicit execution timeouts for browser tasks to prevent zombie processes.
3. **Database Rules**: Save all intermediate execution statuses directly to MongoDB, never keeping state in-memory on worker pods.
