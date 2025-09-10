// src/components/HeroSystems.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Bild in: public/assets/hero-systems.jpg
const HERO = "/assets/hero-systems.jpg";

export default function HeroSystems() {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative isolate">
      <div
        className="
          relative w-full overflow-hidden rounded-3xl border
          shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]
        "
        // Fester Look: Gradient immer aktiv – nie ganz schwarz
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 0% 100%, rgba(34,211,238,0.15), rgba(0,0,0,0) 60%), linear-gradient(90deg, #0b1220 0%, #0f172a 40%, #0b1220 100%)",
        }}
      >
        {/* Fixe Höhe mobil, ab md 16:9 */}
        <div className="relative h-[380px] md:h-auto md:aspect-[16/9]">
          {!imgError && (
            <img
              src={HERO}
              alt="Verkehr, Energienetz und Datenströme visualisiert"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
              onError={() => setImgError(true)}
              loading="eager"
              fetchpriority="high"
            />
          )}

          {/* Overlay nur wenn Bild vorhanden → sonst bleibt der Gradient „heller“ */}
          {!imgError && (
            <div className="absolute inset-0 bg-black/35 md:bg-black/30" />
          )}

          {/* Top-Labels */}
          <div className="pointer-events-none absolute inset-x-0 top-4 hidden md:grid grid-cols-3 gap-2 px-6 text-sm font-medium text-white/90">
            <div className="text-left drop-shadow">Verkehr</div>
            <div className="text-center drop-shadow">Energienetz</div>
            <div className="text-right drop-shadow">Datenströme</div>
          </div>

          {/* Text + CTAs */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <div className="max-w-5xl">
              <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow">
                {t("hero.title")}
              </h1>
              <p className="mt-2 text-white/90 text-sm md:text-base max-w-3xl drop-shadow">
                {t("hero.subtitle")}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/demo"
                  className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-white font-medium hover:bg-cyan-500 transition"
                >
                  {t("hero.ctaPrimary")}
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-white backdrop-blur hover:bg-white/20 transition"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
