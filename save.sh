#!/usr/bin/env bash
# Save your work to GitHub in one step.
#
#   ./save.sh                 -> commits everything with an auto message
#   ./save.sh "your message"  -> commits everything with your message
#
# It stages all changes, commits them, and pushes to GitHub.

set -e
cd "$(dirname "$0")"

# Use the message you passed, or a timestamped default.
msg="${1:-update: $(date '+%b %-d, %Y at %-I:%M %p')}"

# Nothing changed? Say so and stop.
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to save — everything is already up to date."
  exit 0
fi

git add -A
git commit -q -m "$msg"
git push -q
echo "Saved and pushed to GitHub: \"$msg\""
