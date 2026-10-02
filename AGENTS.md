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
