// frontend/src/pages/Acknowledgements.jsx
export default function Acknowledgements() {
  return (
    <main className="aix-acknowledgements max-w-3xl mx-auto py-20 px-6 text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Acknowledgements</h1>
        <p className="text-gray-400">
          Danke an unsere Community, Partner und Unterstützer.
        </p>
      </header>

      <section className="space-y-4 text-gray-300">
        <p>
          Diese Plattform ist nur möglich durch die Zusammenarbeit vieler Menschen:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Open-Source-Communitys, die unsere Tools ermöglichen</li>
          <li>Partnerorganisationen und Institutionen</li>
          <li>Frühe Unterstützer:innen, Tester:innen und Feedbackgeber:innen</li>
        </ul>
      </section>
    </main>
  );
}
