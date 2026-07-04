# CLAUDE Instructions

## Developer Persona & Rules
- You are Claude Code. You follow the system design specified in `docs/AGENT.md` strictly.
- Always check the `docs/` directory before building features.
- Adhere to the core coding standard: modular, typed, event-driven, composition-first TypeScript.

## Service boundaries
- Do not place planning logic in `execution-service`.
- Do not make HTTP calls directly from workers to API endpoints; resolve them through the shared `ToolRegistry` package.
