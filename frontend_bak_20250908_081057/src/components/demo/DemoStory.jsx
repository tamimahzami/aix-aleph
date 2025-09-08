// src/components/demo/DemoStory.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/** kleine Hook ohne zusätzliche Datei */
function useLocalStorage(key, initialValue) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

function Spotlight({ anchorEl, padding = 8 }) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!anchorEl) return;
    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      setRect({
        top: Math.max(r.top - padding, 0),
        left: Math.max(r.left - padding, 0),
        width: r.width + padding * 2,
        height: r.height + padding * 2,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorEl, padding]);

  if (!rect) return null;

  return (
    <>
      {/* Dimmer */}
      <div
        className="fixed inset-0 z-[80] bg-black/60 pointer-events-none"
        aria-hidden="true"
      />
      {/* „Loch“/Ring */}
      <div
        className="fixed z-[81] rounded-xl ring-2 ring-[var(--color-primary)] shadow-dc pointer-events-none"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          boxShadow:
            "0 0 0 9999px rgba(0,0,0,0.55), 0 0 0 2px var(--color-primary)",
        }}
      />
    </>
  );
}

export default function DemoStory({
  anchors = {
    toggles: "#demo-layer-toggles",
    map: "#demo-map",
  },
  onClose, // optional callback
}) {
  const [dismissed, setDismissed] = useLocalStorage("demo_story_done", false);
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(() => !dismissed);

  const steps = useMemo(
    () => [
      {
        id: "intro",
        title: "Willkommen in der Demo",
        text:
          "Hier erlebst du, wie AIX Aleph Karten-Layer kombiniert und Szenarien begreifbar macht. Klicke „Weiter“, ich zeige dir kurz die wichtigsten Stellen.",
        anchor: null,
      },
      {
        id: "toggles",
        title: "Layer ein- und ausblenden",
        text:
          "Mit diesen Schaltern blendest du Drohnen, Lader, Depots und Incidents ein/aus. Spiele verschiedene Kombinationen – das ändert, was du auf der Karte siehst.",
        anchor: "toggles",
      },
      {
        id: "map",
        title: "Interaktive Weltkarte",
        text:
          "Zoome, verschiebe, beobachte Zusammenhänge. In der Vollversion reagieren hier Metriken, Alarme und Agenten auf deine Aktionen.",
        anchor: "map",
      },
      {
        id: "outro",
        title: "Bereit?",
        text:
          "Das war’s schon! Probier die Demo frei aus. Mit Login bekommst du das interaktive Dashboard mit Daten, Health und Leads.",
        anchor: null,
      },
    ],
    []
  );

  const wrapRef = useRef(null);

  // Ankermapping zu DOM-Elementen
  const current = steps[step];
  const anchorEl = (() => {
    if (!current?.anchor) return null;
    const sel =
      current.anchor === "toggles"
        ? anchors.toggles
        : current.anchor === "map"
        ? anchors.map
        : null;
    return sel ? document.querySelector(sel) : null;
  })();

  const closeAll = () => {
    setOpen(false);
    setDismissed(true);
    onClose?.();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") closeAll();
      if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, steps.length - 1));
      if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, steps.length]);

  if (!open) {
    // kleiner „?“-Knopf, um Tour erneut zu starten
    return (
      <button
        aria-label="Demo-Story starten"
        onClick={() => { setStep(0); setOpen(true); setDismissed(false); }}
        className="fixed z-[70] bottom-5 right-5 rounded-full px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-line)] hover:bg-[var(--color-bg)] transition-colors"
      >
        ❓ Kurze Tour
      </button>
    );
  }

  return (
    <>
      {/* Spotlight über Anker */}
      {anchorEl && <Spotlight anchorEl={anchorEl} padding={8} />}

      {/* Panel */}
      <div
        ref={wrapRef}
        className="fixed z-[90] bottom-5 right-5 max-w-[420px] panel p-4"
        role="dialog"
        aria-labelledby="demo-story-title"
        aria-modal="true"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold">
              {step + 1}
            </span>
          </div>
          <div className="grow">
            <h3 id="demo-story-title" className="font-semibold">
              {current.title}
            </h3>
            <p className="text-sm text-muted mt-1">{current.text}</p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] hover:bg-[var(--color-bg)]"
                  disabled={step === 0}
                >
                  Zurück
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    className="px-3 py-1.5 rounded-md btn-primary"
                  >
                    Weiter
                  </button>
                ) : (
                  <button
                    onClick={closeAll}
                    className="px-3 py-1.5 rounded-md btn-primary"
                  >
                    Los geht’s
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {step === steps.length - 1 ? (
                  <button
                    onClick={() => { setStep(0); setDismissed(false); }}
                    className="px-3 py-1.5 rounded-md text-sm hover:text-[var(--color-primary)]"
                  >
                    Nochmal
                  </button>
                ) : (
                  <button
                    onClick={closeAll}
                    className="px-3 py-1.5 rounded-md text-sm hover:text-[var(--color-primary)]"
                  >
                    Überspringen
                  </button>
                )}
              </div>
            </div>

            {/* Fortschritt */}
            <div className="mt-3 h-1 w-full bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)]"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
