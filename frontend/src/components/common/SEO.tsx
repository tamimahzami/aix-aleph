import React from "react";

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  siteName?: string;
};

export default function SEO({
  title = "AIX ALEPH",
  description = "Human ♥ AI — Mobility OS",
  url = "https://aixaleph.com/",
  image = "/og/aix-aleph-og.jpg",
  siteName = "AIX ALEPH",
}: Props) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </>
  );
}
