import React from "react";

export default function CodeSnippet({ code, language = "bash" }) {
  return (
    <pre style={{
      background: "var(--card, #0b1020)",
      color: "#e6f0ff",
      padding: "14px 16px",
      borderRadius: 10,
      overflowX: "auto",
      border: "1px solid var(--border, #1e293b)"
    }}>
      <code aria-label={`Code sample ${language}`}>
        {code}
      </code>
    </pre>
  );
}
