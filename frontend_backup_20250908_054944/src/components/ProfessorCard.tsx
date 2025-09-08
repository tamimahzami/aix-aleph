import { Link } from "react-router-dom";
import type { ProfessorDto } from "../api";

type Props = {
  professor: ProfessorDto;
  /** Wenn gesetzt, wird die Karte klickbar (Link). */
  to?: string;
  /** Zusätzliche CSS-Klassen (Tailwind). */
  className?: string;
  /** Tags anzeigen (default: true) */
  showTags?: boolean;
  /** Bio anzeigen (default: false) */
  showBio?: boolean;
};

export default function ProfessorCard({
  professor: p,
  to,
  className = "",
  showTags = true,
  showBio = false,
}: Props) {
  const Wrapper: React.ComponentType<any> = to ? (Link as any) : ("div" as any);
  const wrapperProps = to ? { to } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        "bg-[#2f3136] p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 block",
        to ? "hover:shadow-xl" : "",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        {p.avatarUrl && (
          <img
            src={p.avatarUrl}
            alt={p.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          <h2 className="text-xl font-bold mb-1 truncate">{p.name}</h2>
          {p.title && <p className="text-gray-300">{p.title}</p>}
          <p className="text-sm text-gray-500 mt-1">
            {p.university || "—"}
            {p.department ? ` · ${p.department}` : ""}
          </p>

          {showBio && p.bio && (
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              {p.bio}
            </p>
          )}

          {showTags && p.tagsCsv && (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tagsCsv.split(",").map((t) => {
                const key = t.trim();
                if (!key) return null;
                return (
                  <span
                    key={key}
                    className="px-2 py-1 rounded-full text-xs bg-white/10"
                  >
                    {key}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
