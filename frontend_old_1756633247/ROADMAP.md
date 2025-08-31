# 🚀 Roadmap – KI-Integrationsplattform  
*(Custom Model + DeepSeek + ChatGPT-5 + AIX Aleph)*

---

## 1. Launch-Phase (MVP, 4–6 Wochen)
**Ziel:** Proof-of-Concept mit stabiler API und erster Industrie-Anbindung.  

### Deliverables
- ✅ Unified API (FastAPI Gateway)  
  - Endpunkt `/query` mit Routing zu ChatGPT-5, DeepSeek, Dummy Custom Model, AIX Aleph Adapter (MQTT)  
- ✅ Minimal DB Schema (PostgreSQL)  
  - Tabellen: `organisations`, `ai_models`, `inference_logs`  
- ✅ Deployment  
  - Dockerfile + Kubernetes Deployment  
  - CI/CD Pipeline (Tests → Build → Deploy)  
- ✅ Industrie-Anbindung (MQTT)  
  - MQTT-Listener für AIX Aleph Sensorwerte  
  - Speicherung in `sensor_data`  

---

## 2. Post-Launch Phase 1 (2–3 Monate)
**Ziel:** Eigenes Modell lauffähig machen + erste Hybrid-Logik.  

### Deliverables
- 🔧 Custom Model Training-Pipeline  
  - Data Lake → Preprocessing → Feature Store → Training  
  - Speicherung in MLflow Model Registry  
- 🔧 Hybrid Orchestrator  
  - Kombination Custom Model + GPT-5 → Ergebnis-Ranking  
- 🔧 DB-Erweiterung  
  - `training_data`, `model_performance`  
  - TimescaleDB für Sensorwerte (Hypertable + Komprimierung)  
- 🔧 Monitoring v1  
  - Prometheus (Request Latenz, Fehlerquote)  
  - Basic Logging mit Elasticsearch  

---

## 3. Post-Launch Phase 2 (6–9 Monate)
**Ziel:** Vollintegration aller Provider, Industrie-Schnittstellen, Sicherheit.  

### Deliverables
- ⚡ DeepSeek API-Adapter produktiv  
  - Error-Handling, Caching, Retry-Mechanismen  
- ⚡ ChatGPT-5 Integration erweitert  
  - Tools-Support, Kosten-/Latenz-basiertes Routing  
- ⚡ AIX Aleph Industrial Adapter  
  - OPC UA Bridge (Maschinendaten in Echtzeit)  
  - Predictive Maintenance API (Lebensdauer-Vorhersagen)  
- ⚡ Security Hardening  
  - TLS 1.3 + Client-Zertifikate für MQTT/OPC UA  
  - Kubernetes Network Policies nach ISA-95  

---

## 4. Skalierungsphase (12+ Monate)
**Ziel:** Plattform wird Enterprise-ready und industrietauglich.  

### Deliverables
- 🧠 MLOps vollständig  
  - Automatisierte Drift-Erkennung  
  - A/B-Testing für Modelle  
  - Rollbacks über MLflow Registry  
- 🧠 Vektordatenbank (Weaviate/Pinecone)  
  - Knowledge Embeddings pro Organisation  
  - Semantische Suche & RAG-Funktionalität  
- 🧠 Monitoring & Alerting 360°  
  - Grafana Dashboards  
  - Alerts für Modell-Latenz, Daten-Drift, Geräte-Offline  
- 🧠 Industrielle Integration Enterprise  
  - Redundante Pipelines (Failover)  
  - Zertifikatsbasierte Authentifizierung für alle OT-Geräte  

---

## 🎯 Verantwortlichkeiten
| Bereich               | Owner          | Status       |
|-----------------------|---------------|--------------|
| API-Gateway           | Backend-Team  | 🚀 MVP       |
| Custom Model Training | Data Science  | ⏳ Phase 1   |
| DeepSeek Integration  | Backend-Team  | ⏳ Phase 2   |
| ChatGPT-5 Orchestrator| Backend-Team  | ⏳ Phase 2   |
| AIX Aleph Adapter     | IoT-Team      | 🚀 MVP       |
| DB & Monitoring       | DevOps        | 🚀 MVP       |
| Security Hardening    | Security-Team | ⏳ Phase 2   |

---

👉 Diese Roadmap zeigt klar den Weg von **MVP → Skalierung**.  
