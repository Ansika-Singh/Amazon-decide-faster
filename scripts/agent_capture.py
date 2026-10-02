#!/usr/bin/env python3
"""
Agent Capture Script for Antigravity IDE.
Captures raw prompt and final response records for 8x assignment into .agent-logs/
"""

import sys
import os
import json
import re
import glob
from datetime import datetime, timezone

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LOGS_DIR = os.path.join(WORKSPACE_DIR, ".agent-logs")
BRAIN_BASE = os.path.expanduser(r"~\.gemini\antigravity-ide\brain")

DEFAULT_AUTHOR = "Ansika2004"
DEFAULT_TOOL = "antigravity-ide"
DEFAULT_PROJECT = "Amazon"
DEFAULT_MODEL = "gemini-3.8-flash"


def get_git_user():
    try:
        import subprocess
        out = subprocess.check_output(["git", "config", "user.name"], cwd=WORKSPACE_DIR, text=True).strip()
        if out:
            return out
    except Exception:
        pass
    return DEFAULT_AUTHOR


def extract_prompt_text(raw_content):
    if not raw_content:
        return ""
    # Extract content inside <USER_REQUEST> if present
    m = re.search(r"<USER_REQUEST>(.*?)</USER_REQUEST>", raw_content, re.DOTALL)
    if m:
        return m.group(1).strip()
    
    # Handle permission denial alternative instruction
    alt_m = re.search(r"alternative:\s*(.*)", raw_content, re.DOTALL)
    if alt_m:
        return alt_m.group(1).strip()
    
    return raw_content.strip()


def parse_transcript_file(transcript_path):
    """
    Parses transcript_full.jsonl (or transcript.jsonl) and extracts
    exchanges: list of dicts with prompt, prompt_time, response, response_time, model
    """
    if not os.path.exists(transcript_path):
        return []

    lines = []
    with open(transcript_path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                lines.append(json.loads(line))
            except Exception:
                continue

    exchanges = []
    current_exchange = None

    for d in lines:
        t = d.get("type")
        src = d.get("source")
        created_at = d.get("created_at") or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

        if t == "USER_INPUT" and src == "USER_EXPLICIT":
            raw_content = d.get("content", "")
            prompt_text = extract_prompt_text(raw_content)
            
            # Start new exchange
            current_exchange = {
                "num": len(exchanges) + 1,
                "prompt": prompt_text,
                "prompt_time": created_at,
                "response": None,
                "response_time": None,
                "model": DEFAULT_MODEL,
            }
            exchanges.append(current_exchange)

        elif t == "PLANNER_RESPONSE" and src == "MODEL":
            content = d.get("content", "")
            tools = d.get("tool_calls", [])
            # In Antigravity, the final text response sent to user has non-empty content and empty tool_calls
            if content and not tools and current_exchange:
                current_exchange["response"] = content.strip()
                current_exchange["response_time"] = created_at
                # Check if model name is available in step or metadata
                if d.get("model"):
                    current_exchange["model"] = d.get("model")

    return exchanges


def format_log_markdown(session_id, exchanges, author, project, tool, model):
    if not exchanges:
        return None

    short_id = session_id[:8]
    first_time = exchanges[0]["prompt_time"]
    last_time = exchanges[-1]["prompt_time"]
    
    # Extract date from first prompt time (format: YYYY-MM-DD)
    date_str = first_time[:10] if first_time and len(first_time) >= 10 else datetime.now(timezone.utc).strftime("%Y-%m-%d")

    lines = [
        "---",
        f"session_id: {session_id}",
        f"date: {date_str}",
        f"author: {author}",
        f"model: {model}",
        f"tool: {tool}",
        f"project: {project}",
        f"total_exchanges: {len(exchanges)}",
        f"first_prompt_time: {first_time}",
        f"last_prompt_time: {last_time}",
        "---",
        "",
        f"# Session Log - {date_str}",
        "",
        f"Session: `{short_id}` | Project: `{project}` | Author: `{author}`",
        "",
        "---",
        ""
    ]

    for ex in exchanges:
        num = ex["num"]
        p_time = ex["prompt_time"]
        r_time = ex["response_time"] or p_time
        ex_model = ex.get("model") or model
        prompt = ex["prompt"]
        response = ex["response"] or ""

        lines.append(f"[LOG_ENTRY type=PROMPT num={num} session={short_id}]")
        lines.append(f"timestamp: {p_time}")
        lines.append(f"model: {ex_model}")
        lines.append("")
        lines.append(prompt)
        lines.append("")
        lines.append("")
        lines.append(f"[LOG_ENTRY type=RESPONSE num={num} session={short_id}]")
        lines.append(f"timestamp: {r_time}")
        lines.append(f"model: {ex_model}")
        lines.append("")
        lines.append(response)
        lines.append("")
        lines.append("")

    return "\n".join(lines)


def process_session(session_id, transcript_path=None):
    if not transcript_path or not os.path.exists(transcript_path):
        # Look in BRAIN_BASE
        candidate_full = os.path.join(BRAIN_BASE, session_id, ".system_generated", "logs", "transcript_full.jsonl")
        candidate_norm = os.path.join(BRAIN_BASE, session_id, ".system_generated", "logs", "transcript.jsonl")
        if os.path.exists(candidate_full):
            transcript_path = candidate_full
        elif os.path.exists(candidate_norm):
            transcript_path = candidate_norm
        else:
            return None

    # Prefer transcript_full.jsonl if it exists in the same directory
    dir_name = os.path.dirname(transcript_path)
    full_path = os.path.join(dir_name, "transcript_full.jsonl")
    if os.path.exists(full_path):
        transcript_path = full_path

    exchanges = parse_transcript_file(transcript_path)
    if not exchanges:
        return None

    author = get_git_user()
    project = os.path.basename(WORKSPACE_DIR) or DEFAULT_PROJECT
    md_content = format_log_markdown(session_id, exchanges, author, project, DEFAULT_TOOL, DEFAULT_MODEL)
    if not md_content:
        return None

    os.makedirs(LOGS_DIR, exist_ok=True)
    
    first_time = exchanges[0]["prompt_time"]
    # Create filename: YYYY-MM-DD_HH-MM-SS_<session-id>.md
    try:
        dt = datetime.fromisoformat(first_time.replace("Z", "+00:00"))
        time_prefix = dt.strftime("%Y-%m-%d_%H-%M-%S")
    except Exception:
        time_prefix = datetime.now(timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")

    filename = f"{time_prefix}_{session_id}.md"
    target_path = os.path.join(LOGS_DIR, filename)

    # Check if a log file for this session already exists with different timestamp prefix
    for existing_file in glob.glob(os.path.join(LOGS_DIR, f"*_{session_id}.md")):
        target_path = existing_file
        break

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    return target_path


def main():
    session_id = None
    transcript_path = None

    if "--hook" in sys.argv:
        try:
            stdin_data = sys.stdin.read().strip()
            if stdin_data:
                payload = json.loads(stdin_data)
                session_id = payload.get("conversationId")
                transcript_path = payload.get("transcriptPath")
        except Exception:
            pass

    if len(sys.argv) > 1 and sys.argv[1] == "--watch":
        # Daemon / Watcher mode
        import time
        seen_mtimes = {}
        while True:
            try:
                # Find all brain sessions
                pattern = os.path.join(BRAIN_BASE, "*", ".system_generated", "logs", "transcript_full.jsonl")
                for path in glob.glob(pattern):
                    sess_id = path.split(os.sep)[-4]
                    mtime = os.path.getmtime(path)
                    if seen_mtimes.get(sess_id) != mtime:
                        seen_mtimes[sess_id] = mtime
                        process_session(sess_id, path)
            except Exception:
                pass
            time.sleep(1)
        return

    for arg in sys.argv[1:]:
        if not arg.startswith("--"):
            session_id = arg
            break

    if not session_id:
        # Auto-detect latest session in BRAIN_BASE
        pattern = os.path.join(BRAIN_BASE, "*", ".system_generated", "logs", "transcript_full.jsonl")
        files = glob.glob(pattern)
        if files:
            files.sort(key=os.path.getmtime, reverse=True)
            transcript_path = files[0]
            session_id = transcript_path.split(os.sep)[-4]

    if session_id:
        out = process_session(session_id, transcript_path)
        if out:
            sys.stderr.write(f"Logged session {session_id} to {out}\n")

    # Always output valid JSON object for hook protocol
    print(json.dumps({}))


if __name__ == "__main__":
    main()
