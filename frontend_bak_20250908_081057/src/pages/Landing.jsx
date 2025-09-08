import React from "react";
import HeartbeatHeroNew from "../components/Hero/HeartbeatHeroNew.jsx";

export default function Landing() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-ink)]">
      <HeartbeatHeroNew />
      {/* …deine weiteren Sections (Features, CTA, etc.) */}
    </div>
  );
}
