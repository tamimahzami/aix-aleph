// frontend/src/pages/Licenses.jsx
export default function Licenses() {
  return (
    <main className="aix-licenses max-w-4xl mx-auto py-20 px-6 text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Open-Source Lizenzen</h1>
      <p className="text-gray-400 mb-6">
        Hier listen wir Drittanbieter-Lizenzen und Copyright-Hinweise.
      </p>

      {/* später per Build-Script / oss-report ersetzen */}
      <pre className="bg-black/30 border border-white/10 rounded-xl p-4 text-sm overflow-auto">
MIT
Apache-2.0
BSD-3-Clause
...
      </pre>
    </main>
  );
}
