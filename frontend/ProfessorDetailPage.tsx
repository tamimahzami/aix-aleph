import { Link, useParams } from "react-router-dom";

export default function ProfessorDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Professoren-Details</h1>
      <p>
        Details zur Professor-ID: <strong>{id}</strong>
      </p>
      <p className="mt-2">
        Hier kannst du Lebenslauf, Publikationen oder Beteiligung an{" "}
        <strong>AIX ALEPH</strong> darstellen.
      </p>

      <Link to="/professors" className="text-[#5865F2] hover:underline inline-flex items-center gap-2 mt-6">
        <span aria-hidden>←</span> Zurück zur Übersicht
      </Link>
    </section>
  );
}
