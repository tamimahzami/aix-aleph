// src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeartbeatIcon from "./HeartbeatIcon.jsx";
import AgentModal from "./AgentModal.jsx";

const year = new Date().getFullYear();

const sections = [
  {
    title: "Product",
    links: [
      { label: "Download", external: true, href: "#" },
      { label: "Nitro", external: true, href: "#" },
      { label: "Status", to: "/status" },
      { label: "App Directory", external: true, href: "#" },
      { label: "Pricing", to: "/preise" },
      { label: "Demo", to: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/ueber-uns" },
      { label: "Jobs", to: "/karriere" },
      { label: "Newsroom", to: "/blog" },
      { label: "Contact", to: "/kontakt" },
      { label: "Company Information", to: "/impressum" },
      { label: "Brand", external: true, href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Developers", to: "/developers" },
      { label: "Creators", to: "/creators" },
      { label: "Community", external: true, href: "#" },
      { label: "StreamKit", external: true, href: "#" },
      { label: "College", external: true, href: "#" },
      { label: "Support", external: true, href: "#" },
      { label: "Safety", external: true, href: "#" },
      { label: "Blog", to: "/blog" },
      { label: "Quests", external: true, href: "#" },
      { label: "Official 3rd Party Merch", external: true, href: "#" },
      { label: "Feedback", to: "/feedback" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms", to: "/agb" },
      { label: "Privacy", to: "/datenschutz" },
      { label: "Cookie Settings", to: "/cookie-settings" },
      { label: "Guidelines", to: "/guidelines" },
      { label: "Acknowledgements", to: "/acknowledgements" },
      { label: "Licenses", to: "/licenses" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070b13] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Link-Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                {sec.title}
              </h3>
              <ul className="space-y-2">
                {sec.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/80 hover:text-white"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        className="text-sm text-white/80 hover:text-white"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {year} AIX Aleph. All rights reserved.
          </p>

          {/* Heartbeat Agent */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => AgentModal.open?.()}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--blurple)] shadow-lg hover:scale-105 transition"
            >
              <HeartbeatIcon className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-[var(--blurple)] opacity-30 blur-xl animate-ping"></span>
            </button>
            <span className="text-xs text-white/60">
              Human ♥ AI Heartbeat
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
