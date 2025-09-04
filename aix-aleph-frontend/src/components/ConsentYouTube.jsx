// src/components/ConsentYouTube.jsx
import React, { useState } from "react";

export default function ConsentYouTube({ videoId, title = "Video", poster }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden border bg-slate-50 dark:bg-slate-900">
      {!ready ? (
        <div className="aspect-video grid place-items-center p-6" style={poster ? { backgroundImage:`url(${poster})`, backgroundSize:'cover' } : {}}>
          <div className="backdrop-blur bg-white/70 dark:bg-slate-800/60 p-4 rounded-xl text-center max-w-md mx-auto">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Zum Schutz deiner Privatsphäre wird das Video erst nach Klick geladen.
            </p>
            <button
              className="rounded-xl bg-cyan-600 text-white px-4 py-2 hover:bg-cyan-700"
              onClick={() => setReady(true)}
            >
              Video laden
            </button>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </div>
  );
}
