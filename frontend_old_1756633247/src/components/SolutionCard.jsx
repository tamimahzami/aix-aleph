import React from "react";
import styles from "../styles/Page.module.css";

export default function SolutionCard({ solution }) {
  return (
    <div className={styles.projectCard}>
      <h3>{solution.title}</h3>
      <p>{solution.description}</p>
      {solution.features?.length ? (
        <ul>
          {solution.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      ) : null}
    </div>
  );
}
