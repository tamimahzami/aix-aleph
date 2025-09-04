# ml_service/main.py
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conlist

app = FastAPI(title="AIX ML Service")

# --- CORS (erlaubt lokale Backends/Frontends) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5001",  # dein Node/Express Backend
        "http://localhost:5173",  # dein Vite/Frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Modelle ----------
class ScheduleItem(BaseModel):
    start: str
    end: str
    kw: float

class SmartChargeReq(BaseModel):
    userEmail: str
    horizonHours: int

class SmartChargeResp(BaseModel):
    schedule: List[ScheduleItem]
    note: str

# Koordinaten als feste 2er-Liste (Pydantic v2: min_length/max_length)
Coord = conlist(float, min_length=2, max_length=2)

class RouteReq(BaseModel):
    userEmail: str
    origin: Coord
    destination: Coord
    departAt: Optional[datetime] = None

class RouteResp(BaseModel):
    etaMinutes: int
    distanceKm: float
    energyKWh: float
    waypoints: List[dict]

# ---------- Endpunkte ----------
@app.post("/smart_charge", response_model=SmartChargeResp)
def smart_charge(req: SmartChargeReq):
    now = datetime.utcnow()
    # Dummy-Plan: heut Nacht laden
    start = now.replace(hour=1, minute=0, second=0, microsecond=0)
    end = start + timedelta(hours=min(3, req.horizonHours))
    return {
        "schedule": [
            {"start": start.isoformat() + "Z", "end": end.isoformat() + "Z", "kw": 7.2}
        ],
        "note": "Dummy schedule – hook up real model later.",
    }

@app.post("/route", response_model=RouteResp)
def route(req: RouteReq):
    # Dummy: fixe ETA & Verbrauch
    return {
        "etaMinutes": 37,
        "distanceKm": 22.4,
        "energyKWh": 4.1,
        "waypoints": [
            {"lat": req.origin[0], "lng": req.origin[1]},
            {"lat": req.destination[0], "lng": req.destination[1]},
        ],
    }
