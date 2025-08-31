import React from "react";

function TinyBars({ data = [], width = 240, height = 80 }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const bw = width / data.length;

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {data.map((v, i) => {
        const h = (v / max) * (height - 6);
        return (
          <rect
            key={i}
            x={i * bw + 2}
            y={height - 3 - h}
            width={Math.max(1, bw - 4)}
            height={h}
            rx="2"
            fill="#94a3b8"
          />
        );
      })}
    </svg>
  );
}

export default TinyBars;
