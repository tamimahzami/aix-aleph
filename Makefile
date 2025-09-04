SHELL := /bin/bash

.PHONY: up down logs be fe smoke

up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f

be:
	curl -sS http://localhost:5001/api/health | jq

fe:
	curl -sS http://localhost:3000/api/health | jq

smoke:
	API_URL=http://localhost:5001 ./cli.sh create
