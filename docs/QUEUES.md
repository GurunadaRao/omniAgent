# Queue Management

## Architecture

We use **BullMQ** running on **Redis** for managing background jobs, distributing task loads, and ensuring reliable execution.

## Key Features

- **Retries**: Configurable exponential backoff on job failures.
- **Dead Letter Queue (DLQ)**: Jobs exceeding maximum retry limits are routed to a dead letter queue for manual inspection.
- **Priority Queue**: Tasks have high, medium, or low priority fields.
- **Concurrency**: Configurable per worker type.
- **Flow Jobs**: Parent-child task dependencies mapped directly through BullMQ parent dependencies.
- **Job Lifecycle**: Tracked via BullMQ events (`completed`, `failed`, `active`, `waiting`).
