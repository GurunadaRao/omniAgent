# Tool Registry

## Architecture

The `ToolRegistry` abstracts all external SDKs and API calls. Workers do not interact with APIs directly; they must resolve tools through `ToolResolver` and `ToolRegistry`.

## Supported Tools

- **Tavily**: Search API for LLMs.
- **Firecrawl**: Markdown crawler.
- **Serper**: Google Search API.
- **OpenAI**: GPT-4o / GPT-4o-mini embeddings and completions.
- **Claude**: Anthropic model access.
- **Gemini**: Google Gemini API.
- **Browser Use / Playwright**: Visual browser automation.
- **GitHub API**: Repository reading and writing.
- **Slack API**: Outgoing team notifications.

## Operations

- **Adding a Tool**: Register the tool class in `ToolRegistry` and expose its interface in shared packages.
- **Removing a Tool**: Remove registry bindings; typescript compilers will flag unused imports.
- **Fallbacks**: Abstract tool executions handle fallback models or mock data to ensure high resilience.
