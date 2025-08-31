import React from "react";
import styles from "../styles/Page.module.css";

export default function VehicleFeature({ feature }) {
  return (
    <div className={styles.benefitCard} role="listitem">
      <div className={styles.benefitIcon} aria-hidden="true">
        {feature.icon || "🚗"}
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
}
