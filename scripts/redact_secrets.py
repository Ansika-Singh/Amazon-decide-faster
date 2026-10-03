import os
import re
import glob

PATTERNS = [
    (re.compile(r'ghp_[A-Za-z0-9]{30,}'), '[REDACTED_GITHUB_PAT]'),
    (re.compile(r'gho_[A-Za-z0-9]{30,}'), '[REDACTED_GITHUB_OAUTH]'),
    (re.compile(r'ghs_[A-Za-z0-9]{30,}'), '[REDACTED_GITHUB_TOKEN]'),
    (re.compile(r'AIzaSy[A-Za-z0-9_-]{33}'), '[REDACTED_GOOGLE_API_KEY]'),
    (re.compile(r'gsk_[A-Za-z0-9]{40,}'), '[REDACTED_GROQ_API_KEY]'),
    (re.compile(r'sk-[A-Za-z0-9_-]{30,}'), '[REDACTED_OPENAI_API_KEY]'),
]

def redact_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        modified = content
        for pattern, replacement in PATTERNS:
            modified = pattern.sub(replacement, modified)
            
        if modified != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            print(f'Redacted secrets in {filepath}')
    except Exception as e:
        print(f'Error processing {filepath}: {e}')

def main():
    log_dir = os.path.join(os.path.dirname(__file__), '..', '.agent-logs')
    if os.path.exists(log_dir):
        for f in glob.glob(os.path.join(log_dir, '*.md')):
            redact_file(f)

if __name__ == '__main__':
    main()
