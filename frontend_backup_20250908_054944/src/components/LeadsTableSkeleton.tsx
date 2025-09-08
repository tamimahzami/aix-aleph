import { SkeletonBox } from "./Skeleton";

export default function LeadsTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="embed">
      <div className="embed-title">Letzte Leads</div>
      <div className="table" role="table" aria-label="Leads laden">
        <div className="table-row table-header" role="row">
          <div className="table-cell" role="columnheader">E-Mail</div>
          <div className="table-cell" role="columnheader">Name</div>
          <div className="table-cell" role="columnheader">Erstellt</div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="table-row" role="row">
            <div className="table-cell"><SkeletonBox className="h-4 w-56" /></div>
            <div className="table-cell"><SkeletonBox className="h-4 w-32" /></div>
            <div className="table-cell"><SkeletonBox className="h-4 w-40" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
