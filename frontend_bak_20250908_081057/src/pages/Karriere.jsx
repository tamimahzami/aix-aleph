// frontend/src/pages/Karriere.jsx
import React from "react";

export default function Karriere() {
  return (
    <main
      className="max-w-5xl mx-auto p-6 md:p-10 text-gray-100"
      aria-labelledby="karriere-title"
    >
      {/* Hero */}
      <header className="mb-10" role="banner">
        <p className="uppercase tracking-wide text-sm opacity-80">KARRIERE</p>
        <h1 id="karriere-title" className="text-4xl md:text-5xl font-bold mt-2">
          Baue mit uns das Betriebssystem für KI-Agenten.
        </h1>
        <p className="mt-4 text-lg opacity-90">
          Wir vereinen Wissenschaft, Engineering und Unternehmertum, um autonome Agenten
          sicher, erklärbar und global einsetzbar zu machen. Ob Forschung, Systems, Product
          oder Go-to-Market – wenn du die Zukunft wirklich bauen willst, bist du hier richtig.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:careers@aix-aleph.com?subject=Bewerbung%20AIX%20Aleph&body=Kurz:%20Warum%20AIX%20Aleph%3F%0AProfil%20/%20Links%3A%20"
            className="px-5 py-3 rounded-2xl shadow hover:shadow-lg transition font-medium bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Jetzt bewerben
          </a>
          <a
            href="/ueber-uns"
            className="px-5 py-3 rounded-2xl border border-white/30 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Mehr über AIX Aleph
          </a>
        </div>
      </header>

      {/* Mission */}
      <section className="mb-10" aria-labelledby="mission-title">
        <h2 id="mission-title" className="text-2xl font-semibold">
          Mission: Verantwortung in die Hände von Agenten legen
        </h2>
        <p className="mt-3 opacity-90">
          AIX ALEPH entwickelt eine neuro-symbolische Intelligenz, die auf einem Realtime-Fabric
          und einem Trust-Layer aufbaut. Dieser Stack macht kritische Entscheidungen erklärbar.
          Wir suchen Menschen, die Forschung in Produkte verwandeln.
        </p>
        <ul className="mt-4 grid md:grid-cols-3 gap-4">
          <li className="p-4 rounded-2xl bg-white/5">
            <h3 className="font-medium">Wissenschaft → Wirkung</h3>
            <p className="opacity-90 text-sm mt-1">
              Wir publizieren, patentieren und verschiffen – nicht entweder-oder.
            </p>
          </li>
          <li className="p-4 rounded-2xl bg-white/5">
            <h3 className="font-medium">Security by Design</h3>
            <p className="opacity-90 text-sm mt-1">
              Policy-First, Audit-Artefakte, Hardware-Enklaven – Sicherheit ist Produktmerkmal.
            </p>
          </li>
          <li className="p-4 rounded-2xl bg-white/5">
            <h3 className="font-medium">Global & Remote-First</h3>
            <p className="opacity-90 text-sm mt-1">
              Elite-Team, HQ London & EU-Hubs, echte Remote-Kultur.
            </p>
          </li>
        </ul>
      </section>

      {/* Offene Rollen */}
      <section className="mb-12" aria-labelledby="rollen-title">
        <h2 id="rollen-title" className="text-2xl font-semibold">Offene Rollen</h2>
        <p className="mt-2 opacity-90">
          Wir stellen ganzjährig exzellente Engineers, Researcher und Builder ein.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {/* Research Scientist */}
          <article className="rounded-2xl bg-white/5 p-5 flex flex-col" aria-labelledby="role-research">
            <h3 id="role-research" className="text-xl font-semibold">
              Research Scientist (Neuro-Symbolic / RL)
            </h3>
            <p className="mt-1 text-sm opacity-80">Standort: London / EU Remote</p>
            <p className="mt-3 text-sm opacity-90">
              Entwickle Methoden an der Schnittstelle von Spiking-NN, Logik und Plannern.
              Publiziere und bringe Ergebnisse in die Praxis.
            </p>
            <a
              href="mailto:careers@aix-aleph.com?subject=Research%20Scientist%20Neuro-Symbolic/RL&body=Kurz:%20Warum%20AIX%20Aleph%3F%0ALinks%20zu%20Publikationen%2FCode%3A%20"
              className="mt-auto inline-block px-4 py-2 rounded-xl bg-white text-gray-900 font-medium hover:shadow focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Bewerben
            </a>
          </article>

          {/* Senior Systems Engineer */}
          <article className="rounded-2xl bg-white/5 p-5 flex flex-col" aria-labelledby="role-systems">
            <h3 id="role-systems" className="text-xl font-semibold">
              Senior Systems Engineer (Realtime Fabric)
            </h3>
            <p className="mt-1 text-sm opacity-80">Standort: London / Remote</p>
            <p className="mt-3 text-sm opacity-90">
              Baue das Nervensystem für Edge→Cloud: Mikrosekunden-Latenz, CRDTs, deterministische Streams.
            </p>
            <a
              href="mailto:careers@aix-aleph.com?subject=Senior%20Systems%20Engineer%20(Realtime%20Fabric)&body=Kurz:%20Warum%20AIX%20Aleph%3F%0ARelevante%20Systems-Erfahrung%3A%20"
              className="mt-auto inline-block px-4 py-2 rounded-xl bg-white text-gray-900 font-medium hover:shadow focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Bewerben
            </a>
          </article>

          {/* Product Engineer */}
          <article className="rounded-2xl bg-white/5 p-5 flex flex-col" aria-labelledby="role-product">
            <h3 id="role-product" className="text-xl font-semibold">
              Product Engineer (Agent OS)
            </h3>
            <p className="mt-1 text-sm opacity-80">Standort: EU / Remote</p>
            <p className="mt-3 text-sm opacity-90">
              Verbinde Perzeption, Planung und Policies zu nutzbaren Produkten – obsessiv in den Details.
            </p>
            <a
              href="mailto:careers@aix-aleph.com?subject=Product%20Engineer%20(Agent%20OS)&body=Kurz:%20Warum%20AIX%20Aleph%3F%0AProdukt-Referenzen%2FRepos%3A%20"
              className="mt-auto inline-block px-4 py-2 rounded-xl bg-white text-gray-900 font-medium hover:shadow focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Bewerben
            </a>
          </article>
        </div>
      </section>

      {/* Programme */}
      <section className="mb-12" aria-labelledby="programme-title">
        <h2 id="programme-title" className="text-2xl font-semibold">
          Programme: Hochschulen, Elite-Netzwerke & Fellowships
        </h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/5 p-5">
            <h3 className="text-lg font-semibold">AIX Foundry Fellows</h3>
            <p className="mt-2 opacity-90">
              3–6 Monate Forschungsprojekt mit Mentor:in, Zugang zu Compute, Datasets und Fabric-APIs.
              Stipendium &amp; Co-Authorship.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <h3 className="text-lg font-semibold">University Alliances</h3>
            <p className="mt-2 opacity-90">
              Gemeinsame Labs/Kurse zu Neuro-Symbolik &amp; Systems. Praktika, Master-/PhD-Thesen, gesponserte Projekte.
            </p>
          </div>
        </div>
      </section>

      {/* Warum AIX Aleph */}
      <section className="mb-12" aria-labelledby="why-title">
        <h2 id="why-title" className="text-2xl font-semibold">Warum AIX Aleph?</h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-4">
          <li className="p-4 rounded-2xl bg-white/5"><strong>Ownership:</strong> Große Verantwortung, ESOP-Pakete.</li>
          <li className="p-4 rounded-2xl bg-white/5"><strong>Remote-First:</strong> Flexible Arbeit weltweit.</li>
          <li className="p-4 rounded-2xl bg-white/5"><strong>Learning Budget:</strong> Konferenzen, Kurse, Forschung.</li>
          <li className="p-4 rounded-2xl bg-white/5"><strong>Impact Domains:</strong> Mobilität, Energie, Sicherheit.</li>
        </ul>
      </section>

      {/* Hiring-Prozess */}
      <section className="mb-12" aria-labelledby="prozess-title">
        <h2 id="prozess-title" className="text-2xl font-semibold">Hiring-Prozess</h2>
        <ol className="mt-4 space-y-3 list-decimal ml-6">
          <li><strong>Intro:</strong> 20–30 Min Gespräch über Ziele &amp; Hintergrund.</li>
          <li><strong>Deep Dive:</strong> Technisches oder Forschungsgespräch.</li>
          <li><strong>Challenge:</strong> Realistische, bezahlte Aufgabe.</li>
          <li><strong>Teamfit:</strong> Gespräch mit den Gründer:innen.</li>
          <li><strong>Angebot:</strong> Transparent inkl. ESOP.</li>
        </ol>
      </section>

      {/* Inklusion */}
      <section className="mb-12" aria-labelledby="inklusion-title">
        <h2 id="inklusion-title" className="text-2xl font-semibold">
          Inklusion ≠ Nice-to-have – es ist unser Motor
        </h2>
        <p className="mt-2 opacity-90">
          Wir stellen nach Exzellenz, Integrität und Wirkung ein. Herkunft, Identität und Lebensweg
          erweitern unser System und machen unsere Produkte besser. Jede Bewerbung wird fair und
          vertraulich behandelt.
        </p>
      </section>

      {/* CTA */}
      <section className="mb-16" aria-labelledby="cta-title">
        <h2 id="cta-title" className="text-2xl font-semibold">
          Bereit, die Agenten-Ära mitzugestalten?
        </h2>
        <p className="mt-2 opacity-90">
          Schick uns deinen Lebenslauf oder ein kurzes „Why AIX Aleph“. Wir melden uns bei dir.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="mailto:careers@aix-aleph.com?subject=Initiativbewerbung&body=Kurz:%20Warum%20AIX%20Aleph%3F%0AStandort%3A%20%0ARolle(n)%3A%20%0ALinks%3A%20"
            className="px-5 py-3 rounded-2xl shadow hover:shadow-lg transition font-medium bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Initiativ bewerben
          </a>
          <a
            href="/datenschutz"
            className="px-5 py-3 rounded-2xl border border-white/30 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Datenschutz für Bewerbungen
          </a>
        </div>
      </section>
    </main>
  );
}
