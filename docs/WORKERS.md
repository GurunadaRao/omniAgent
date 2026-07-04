# Worker Architecture

## Web Worker
- **Purpose**: Crawls web pages and extracts static contents.
- **Inputs**: URL, selectors, depth.
- **Outputs**: Markdown text, page title.
- **Tools**: Firecrawl, axios.
- **Failure Handling**: HTTP status checks, auto-fallback to mock pages on failure.
- **Retry Logic**: Retry up to 3 times with exponential backoff.

## Browser Worker
- **Purpose**: Automates complex page interactions (clicks, forms).
- **Tools**: Playwright, Puppeteer.

## GitHub Worker
- **Purpose**: Interacts with codebases, PRs, and files.
- **Tools**: Octokit / GitHub API.

## LLM Worker
- **Purpose**: Processes text summarization, classification, and planning suggestions.
- **Tools**: OpenAI, Claude, Gemini.

## API Worker
- **Purpose**: Calls generic REST/GraphQL API endpoints.

## Document Worker
- **Purpose**: Parses local PDFs, CSVs, or text documents.

## Code Worker
- **Purpose**: Executes sandboxed code snippets for calculation or data-processing validation.

## RAG Worker
- **Purpose**: Vector database retrieval and embedding generation.
