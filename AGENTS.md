# Agent Capture Rules (8x Assignment)

## Mandatory Automatic Prompt & Response Capture

1. **Logging Requirement**:
   All user prompts and final model responses must be logged verbatim to `.agent-logs/` in the format specified by the 8x assignment.
   - Script: `scripts/agent_capture.py`
   - Hooks: `.agents/hooks.json` configured for lifecycle `Stop` event.
   - Background Watcher: `python scripts/agent_capture.py --watch` continuously monitors session transcripts in `~/.gemini/antigravity-ide/brain/`.

2. **Integrity Rules**:
   - Never add `.agent-logs/` to `.gitignore`.
   - Never edit, tidy, summarize, or delete any entries in `.agent-logs/`.
   - Commit logs interleaved with code changes as work progresses.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
