import { Link } from "react-router-dom";
import type { Experiment } from "../lib/api";

export default function ExperimentsList({ items }: { items: Experiment[] }) {
  if (!items?.length) return <div className="embed">Keine Experiments vorhanden.</div>;

  return (
    <div className="embed">
      <div className="embed-title">Liste</div>
      <div className="table" role="table" aria-label="Experiments">
        <div className="table-row table-header" role="row">
          <div className="table-cell" role="columnheader">Name</div>
          <div className="table-cell" role="columnheader">Status</div>
          <div className="table-cell" role="columnheader">Aktion</div>
        </div>
        {items.map((e) => (
          <div className="table-row" role="row" key={e.id}>
            <div className="table-cell">{e.name}</div>
            <div className="table-cell">{e.status}</div>
            <div className="table-cell">
              <Link className="link" to={`/experiments/${e.id}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
