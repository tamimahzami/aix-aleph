#!/usr/bin/env bash
# restore.sh – DB-only Restore für uw_pico_509-backend_dbdata
# Spielt NUR die SQLite-Daten im Docker-Volume zurück.
# Unterstützt:
#  - Pfad zu einem Backup-Archiv (.tar.gz) als Argument
#  - oder automatische Wahl des neuesten Archivs:
#       backup_*/dbdata_*.tar.gz  ODER  dbdata_backup_*.tar.gz

set -euo pipefail

VOLUME="uw_pico_509-backend_dbdata"
SERVICE="backend"

red()   { printf "\033[31m%s\033[0m\n" "$*"; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }
cyan()  { printf "\033[36m%s\033[0m\n" "$*"; }

pick_latest_backup() {
  # zuerst in den strukturierten Ordnern suchen, dann im Root
  local latest
  latest=$(ls -1t backup_*/dbdata_*.tar.gz 2>/dev/null | head -n1 || true)
  if [[ -z "${latest}" ]]; then
    latest=$(ls -1t dbdata_backup_*.tar.gz 2>/dev/null | head -n1 || true)
  fi
  echo "${latest}"
}

ARCHIVE="${1:-}"

if [[ -z "${ARCHIVE}" ]]; then
  ARCHIVE="$(pick_latest_backup)"
  if [[ -z "${ARCHIVE}" ]]; then
    red "❌ Kein Backup-Archiv gefunden."
    echo "Tipp: Übergib einen Pfad, z.B.:  ./restore.sh backup_20250831_191317/dbdata_20250831_191317.tar.gz"
    exit 1
  fi
fi

if [[ ! -f "${ARCHIVE}" ]]; then
  red "❌ Datei nicht gefunden: ${ARCHIVE}"
  exit 1
fi

cyan "⚠️  Das stellt NUR die DB wieder her – Code bleibt unverändert."
read -r -p "Fortfahren und Volume '${VOLUME}' überschreiben? (yes/NO) " ans
if [[ "${ans:-}" != "yes" ]]; then
  red "Abgebrochen."
  exit 1
fi

cyan "▶️  Containerservice stoppen (falls läuft)…"
docker compose stop "${SERVICE}" >/dev/null 2>&1 || true

cyan "▶️  Docker-Volume löschen: ${VOLUME}"
docker volume rm "${VOLUME}" >/dev/null 2>&1 || true

cyan "▶️  Docker-Volume neu erstellen: ${VOLUME}"
docker volume create "${VOLUME}" >/dev/null

cyan "▶️  Backup einspielen: ${ARCHIVE}"
docker run --rm \
  -v "${VOLUME}:/data" \
  -v "$(pwd):/backup" \
  alpine sh -c "apk add --no-cache tar >/dev/null && tar xzf \"/backup/${ARCHIVE}\" -C /"

# Das Archiv enthält /data…, durch -C / landet es korrekt wieder unter /data im Volume.

cyan "▶️  Backend starten…"
docker compose up -d "${SERVICE}" >/dev/null

green "✅ Restore fertig."
cyan  "ℹ️  Checks:"
echo "   curl -sS http://localhost:5001/health"
echo "   curl -sS http://localhost:5001/api/experiments | jq ."
