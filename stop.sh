#!/usr/bin/env bash

echo "🛑 Stoppe Backend & Frontend…"
PID_BACKEND=$(lsof -ti :5001 || true)
PID_FRONTEND=$(lsof -ti :5173 || true)
[ -n "$PID_BACKEND" ] && kill -9 $PID_BACKEND && echo "Backend gestoppt"
[ -n "$PID_FRONTEND" ] && kill -9 $PID_FRONTEND && echo "Frontend gestoppt"
