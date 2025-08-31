#!/usr/bin/env bash
set -euo pipefail

# Ein Zeitstempel, EINMAL gesetzt (verhindert zwei verschiedene Ordnernamen)
TS="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR="backup_${TS}"

echo "▶️  Erstelle Ordner: ${BACKUP_DIR}"
mkdir -p "${BACKUP_DIR}"

echo "▶️  Sichere Projektdateien (ohne node_modules, .git, frühere Backups)…"
# rsync ist robuster als cp -r (keine Probleme mit Leerzeichen/fehlenden Symlinks)
rsync -a \
  --exclude '.git/' \
  --exclude 'node_modules*/' \
  --exclude 'backup_*/' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  ./ "${BACKUP_DIR}/project/"

# Falls du api.sh nicht hast, ist das ok – rsync nimmt alles was existiert.
# DB-Volume sichern (Docker)
# Falls dein Compose-Volume anders heißt, HIER anpassen:
VOL_NAME="uw_pico_509-backend_dbdata"
DB_ARCHIVE="${BACKUP_DIR}/dbdata_${TS}.tar.gz"

echo "▶️  Sicherung Docker-Volume (${VOL_NAME}) -> ${DB_ARCHIVE}"
docker run --rm \
  -v "${VOL_NAME}:/data" \
  -v "$(pwd):/backup" \
  alpine sh -c "tar czf \"/backup/${DB_ARCHIVE}\" -C / data"

echo "✅ Backup fertig: ${BACKUP_DIR}"
