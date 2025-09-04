import { useState } from "react";
import { api } from "../lib/api";
import type { ExperimentStatus } from "../types";

export default function ExperimentForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ExperimentStatus>("DRAFT");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.createExperiment({ name, status });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Experiment name" />
      <div>
        {(["DRAFT","RUNNING","COMPLETED","CANCELLED"] as ExperimentStatus[]).map(s=>(
          <button type="button" key={s} onClick={()=>setStatus(s)}>
            {s}{status===s?" ✓":""}
          </button>
        ))}
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
