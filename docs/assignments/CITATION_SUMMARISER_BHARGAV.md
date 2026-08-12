# V1 Assignment: Citation & Summariser Layer (Report Service)

**Assignee**: Bhargav  
**Layer / Domain**: Citation & Report Layer (`apps/report-service`) & Delivery API (`apps/api`)  
**Target Release**: Version 1 (Core Automation - Production Ready)

---

## 📌 Primary Goals
Bhargav is responsible for listening to project completion events, fetching all executed task results from MongoDB, extracting and deduplicating source citations, synthesizing raw Markdown analytical reports, saving report artifacts, and serving report downloads via the API Gateway.

---

## 📋 Actionable Task List

### 1. Event Consumer & Result Aggregation (`apps/report-service`)
- [ ] **Event Listener**: Subscribe to `PROJECT_COMPLETED` events broadcast via Redis Pub/Sub / BullMQ event channels.
- [ ] **Data Aggregation**: Query MongoDB `Results` and `Tasks` collections to fetch all intermediate worker outputs associated with the `projectId`.
- [ ] **State Check**: Ensure all required task outputs are present and handle partially failed DAG execution reports gracefully.

### 2. Citation Processing & Verification Engine
- [ ] **Citation Extractor**: Extract URLs, web domains, GitHub repository references, and source metadata from worker outputs.
- [ ] **Deduplication & Normalization**: Deduplicate identical source links and format unified citation identifiers (e.g., `[1]`, `[2]`).
- [ ] **Footnotes & References**: Append structured reference sections and inline citation markers to analytical findings.

### 3. Markdown Synthesis Engine
- [ ] **Report Structuring**: Implement template-driven synthesis that organizes raw output into sections:
  - Executive Summary
  - Key Insights & Analysis
  - Workflows Executed (Task Breakdown Summary)
  - Sources & References
- [ ] **Markdown Formatter**: Ensure clean, valid GFM (GitHub Flavored Markdown) formatting with tables, blockquotes, and code blocks.
- [ ] **Report Persistence**: Store compiled `.md` document and metadata in MongoDB `Reports` collection.

### 4. API Delivery & Production Readiness (`apps/api`)
- [ ] **Download API Endpoint**: Implement `GET /reports/:id` and `GET /projects/:id/report` in `apps/api` to return raw Markdown files or JSON payloads.
- [ ] **Unit Tests**: Test citation extraction, deduplication algorithms, and Markdown template compilation.
- [ ] **Integration Tests**: Verify end-to-end report generation upon receiving a `PROJECT_COMPLETED` event.
- [ ] **Observability**: Add structured log metrics for report synthesis duration and citation counts.

---

## 🔗 Key Dependencies & Interfaces
- **Inputs from Guran (Execution)**: Listens for `PROJECT_COMPLETED` event and reads data from `Results` and `Tasks` collections.
- **Outputs to User / API**: Delivers structured Markdown reports via `apps/api`.
