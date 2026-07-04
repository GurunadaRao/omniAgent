# Database Design

## Collections

- **Tasks**: Stores task graphs, individual execution inputs/outputs, and logs.
- **Reports**: Contains aggregated markdown content and citation references.
- **ExecutionLogs**: Immutable records of execution history.
- **Workers**: Status and registration of worker instances.
- **Users**: User credentials and account settings.
- **Projects**: Groupings of tasks and reports.

## Schemas & Relationships

- A `Project` has many `Tasks`.
- A `Task` can have many dependent child tasks.
- A `Report` points to a `Project` and references multiple `Tasks`.

## Indexes

- `Tasks`: Unique index on `taskId`. Compound index on `projectId` + `status`.
- `ExecutionLogs`: Time-series index on `timestamp`.
