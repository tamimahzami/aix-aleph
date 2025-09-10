#!/usr/bin/env bash
set -euo pipefail

BASE=${BASE:-"http://127.0.0.1:5001/api"}
EMAIL=${EMAIL:-"admin@example.com"}
PASS=${PASS:-"password123"}
LEAD_EMAIL=${LEAD_EMAIL:-"test.user@example.com"}
LEAD_NAME=${LEAD_NAME:-"Test User"}

have_jq() { command -v jq >/dev/null 2>&1; }
pretty() { if have_jq; then jq; else cat; fi; }

hr() { printf "%s\n" "------------------------------------------------------------"; }
ok() { printf "✅ %s\n" "$*"; }
fail() { printf "❌ %s\n" "$*" >&2; exit 1; }

echo
hr
echo "AIX Aleph Backend Quick Test"
echo "BASE=$BASE"
hr

# 1) Health
echo "[1/7] Health..."
curl -fsS "$BASE/health" | pretty
ok "Health ok"

# 2) Login
echo
echo "[2/7] Login..."
TOKEN=$(
  curl -fsS "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" \
  | (have_jq && jq -r '.token' || sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
)
[ -n "${TOKEN:-}" ] || fail "Kein Token erhalten"
echo "Token (gekürzt): ${TOKEN:0:24}..."
ok "Login ok"
AUTH=(-H "Authorization: Bearer $TOKEN")

# 3) Professors (Liste)
echo
echo "[3/7] Professors: Liste..."
PROF_LIST=$(curl -fsS "$BASE/professors")
echo "$PROF_LIST" | pretty
COUNT=$(echo "$PROF_LIST" | (have_jq && jq -r '.total // (.items|length)' || echo ""))
echo "Gefunden: ${COUNT:-?}"

# 4) Professors (Detail)
echo
echo "[4/7] Professors: Detail erstes Element..."
FIRST_ID=$(echo "$PROF_LIST" | (have_jq && jq -r '.items[0].id' || echo ""))
[ -n "${FIRST_ID:-}" ] || fail "Kein Professor gefunden"
curl -fsS "$BASE/professors/$FIRST_ID" | pretty
ok "Professor-Detail ok"

# 5) Lead anlegen (idempotent)
echo
echo "[5/7] Lead anlegen (öffentlich)..."
TMP_BODY=$(mktemp)
HTTP_CODE=$(
  curl -sS "$BASE/leads" \
    -o "$TMP_BODY" \
    -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$LEAD_EMAIL\",\"name\":\"$LEAD_NAME\"}"
)
cat "$TMP_BODY" | pretty
rm -f "$TMP_BODY"
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "409" ]; then
  ok "Lead anlegen ok (HTTP $HTTP_CODE)"
else
  fail "Lead anlegen fehlgeschlagen (HTTP $HTTP_CODE)"
fi

# 6) Leads listen (auth)
echo
echo "[6/7] Leads listen (mit Token)..."
curl -fsS "$BASE/leads" "${AUTH[@]}" | pretty
ok "Leads abruf ok"

# 7) Chat (mock)
echo
echo "[7/7] Chat (mock provider)..."
curl -fsS "$BASE/chat" \
  -H "Content-Type: application/json" \
  "${AUTH[@]}" \
  -d '{"message":"Sag hallo! :)","provider":"mock"}' | pretty
ok "Chat ok"

hr
ok "Alle Checks erfolgreich 🎉"
