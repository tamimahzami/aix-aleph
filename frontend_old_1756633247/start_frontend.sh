#!/bin/bash
# Startskript für das React-Frontend auf Port 3001

cd "$(dirname "$0")"   # ins Projektverzeichnis wechseln
echo "🚀 Starte Frontend auf http://localhost:3001 ..."
PORT=3001 npm start
