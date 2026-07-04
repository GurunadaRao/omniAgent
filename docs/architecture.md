# Architecture Specification

## System Overview

```text
System Overview

Planner Service
      ↓
Execution Service
      ↓
 Worker Pool
      ↓
Tool Registry
      ↓
Result Collector
      ↓
Report Generator
```

Omni-Agent is designed as a distributed, event-driven multi-agent execution platform.

### Component Details

1. **Planner Service**: Receives high-level user tasks and parses them into a dependency graph of sub-tasks.
2. **Execution Service**: Uses BullMQ backed by Redis to orchestrate and queue task execution.
3. **Worker Pool**: A collection of specialized task executors.
4. **Tool Registry**: Provides abstract interfaces to web browsers, LLMs, and external APIs.
5. **Result Collector**: Gathers individual worker outputs and aggregates them.
6. **Report Generator**: Formats the aggregated results into readable outputs (Markdown, PDF).
