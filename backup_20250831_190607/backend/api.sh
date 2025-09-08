#!/usr/bin/env bash
set -euo pipefail

BASE=${BASE:-http://localhost:5001}
HDR=(-H "Content-Type: application/json" -H "Accept: application/json")

green(){ printf "\033[32m%s\033[0m\n" "$*"; }

get()   { curl -sS "$BASE$1"; }
post()  { curl -sS -X POST  "$BASE$1" "${HDR[@]}" --data-binary "$2"; }
patch() { curl -sS -X PATCH "$BASE$1" "${HDR[@]}" --data-binary "$2"; }
del()   { curl -sS -X DELETE "$BASE$1"; }

case "${1:-}" in
  health)
    get /health | jq .
    get /api/health | jq .
    ;;

  list)
    get /api/experiments | jq .
    ;;

  create)
    # usage: ./api.sh create "Experiment Name"
    NAME=${2:-"Pricing Test"}
    BODY=$(jq -n --arg n "$NAME" '{
      name:$n, description:"AB rund um Preise", type:"AB",
      status:"DRAFT", strategy:"FIXED",
      arms:[
        {name:"Control", initialSplit:50, isChampion:true},
        {name:"Variant", initialSplit:50}
      ]
    }')
    post /api/experiments "$BODY" | jq .
    ;;

  id)
    # usage: ./api.sh id "Experiment Name"
    NAME=${2:?Name fehlt}
    get /api/experiments | jq -r --arg n "$NAME" '.[]|select(.name==$n)|.id' | head -n1
    ;;

  arms)
    # usage: ./api.sh arms <EXP_ID>
    EXP=${2:?EXP_ID fehlt}
    get /api/experiments/$EXP | jq '.arms'
    ;;

  metric)
    # usage: ./api.sh metric <EXP_ID> <ARM_ID> <key> <value>
    EXP=${2:?EXP_ID fehlt}
    ARM=${3:?ARM_ID fehlt}
    KEY=${4:?key fehlt}
    VAL=${5:?value fehlt}
    BODY=$(jq -n --arg a "$ARM" --arg k "$KEY" --argjson v "$VAL" '{armId:$a, key:$k, value:$v}')
    post /api/experiments/$EXP/metrics "$BODY" | jq .
    ;;

  run)
    # usage: ./api.sh run <EXP_ID> [note]
    EXP=${2:?EXP_ID fehlt}
    NOTE=${3:-"rollout gestartet"}
    BODY=$(jq -n --arg note "$NOTE" '{status:"RUNNING", notes:$note}')
    patch /api/experiments/$EXP "$BODY" | jq .
    ;;

  delete)
    # usage: ./api.sh delete <EXP_ID>
    EXP=${2:?EXP_ID fehlt}
    del /api/experiments/$EXP | jq .
    ;;

  *)
    cat >&2 <<'USAGE'
Usage:
  ./api.sh health
  ./api.sh list
  ./api.sh create "Pricing Test"
  ./api.sh id "Pricing Test"
  ./api.sh arms <EXP_ID>
  ./api.sh metric <EXP_ID> <ARM_ID> <key> <value>
  ./api.sh run <EXP_ID> [note]
  ./api.sh delete <EXP_ID>
USAGE
    exit 1
    ;;
esac
