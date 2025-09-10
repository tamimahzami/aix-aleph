#!/usr/bin/env bash
# 📖 Zeigt das Launch-README mit Farben an

if command -v bat >/dev/null 2>&1; then
  bat --style=plain --paging=always README_LAUNCH.md
else
  cat README_LAUNCH.md | less
fi
