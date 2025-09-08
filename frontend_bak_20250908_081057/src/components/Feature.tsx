// src/components/Feature.tsx
import React from 'react';

type FeatureProps = {
  title: string;
  text: string;
  reversed?: boolean;
  image?: React.ReactNode;
};

export default function Feature({
  title,
  text,
  reversed,
  image
}: FeatureProps) {
  return (
    <div
      className={`mb-24 flex items-center gap-10 ${
        reversed ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"
      }`}
    >
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-lg text-[#99AAB5]">{text}</p>
      </div>
      <div className="flex-1 h-64 md:h-96 rounded-2xl bg-[#2f3136] grid place-items-center text-[#99AAB5] shadow-xl">
        {image || "Feature Illustration"}
      </div>
    </div>
  );
}
