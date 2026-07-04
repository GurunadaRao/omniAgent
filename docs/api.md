# API Endpoint Specification

## Endpoints

### 1. Submit Request
- **Route**: `POST /query`
- **Description**: Submits a new user query to trigger planning.
- **Request Body**:
  ```json
  {
    "prompt": "Research the latest advances in fusion energy."
  }
  ```
- **Response**:
  ```json
  {
    "taskId": "task_12345",
    "status": "planned"
  }
  ```

### 2. Create Custom Tasks
- **Route**: `POST /tasks`
- **Description**: Bypasses the planner and schedules a task directly.

### 3. Get Task Status
- **Route**: `GET /tasks/:id`
- **Description**: Returns execution details and outputs.

### 4. Get Generated Report
- **Route**: `GET /report/:id`
- **Description**: Fetches the structured output document.

### 5. Retry Failed Task
- **Route**: `POST /retry`
- **Description**: Re-queues a failed task.

### 6. Health Check
- **Route**: `GET /health`
- **Description**: Service health response.
