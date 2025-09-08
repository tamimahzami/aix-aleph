import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeartbeatHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-hero-gradient p-8 md:p-14 border border-[var(--color-line)] shadow-dc">
      {/* zarte Glow-Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(650px 300px at 20% 20%, rgba(88,101,242,.25), transparent 60%), radial-gradient(700px 320px at 80% 10%, rgba(235,69,158,.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl grid gap-8 md:grid-cols-[1fr,320px] items-center">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 px-3 py-1 text-xs text-muted">
            Human ♥ Computing
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            AIX Aleph —{" "}
            <span className="text-[var(--color-primary)]">Mutterschiff</span>
            {" "}der Human-Computing Vision
          </h1>

          <p className="mt-4 text-[17px] text-muted max-w-xl">
            Klarheit · Verantwortung · Liebe.  
            Ein Herzschlag, der Mensch & KI verbindet – verständlich, verantwortungsvoll, nah.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Jetzt starten
            </Link>
            <Link
              to="/info/manifesto"
              className="btn btn-ghost"
            >
              Manifest lesen
            </Link>
          </div>
        </div>

        {/* Herz */}
        <div className="justify-self-center md:justify-self-end">
          <div className="relative grid place-items-center rounded-2xl bg-[var(--color-surface)]/50 border border-[var(--color-line)] p-8 aspect-square w-[260px]">
            <Heart
              className="heartbeat"
              size={144}
              strokeWidth={1.5}
              color="currentColor"
            />
            {/* farbiges Füllen via Pseudo-Overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(88,101,242,.35), transparent 60%)",
              }}
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Human ♥ Computing HeartBeat
          </p>
        </div>
      </div>
    </section>
  );
}
