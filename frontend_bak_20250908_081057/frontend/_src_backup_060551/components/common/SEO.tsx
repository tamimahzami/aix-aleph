import React from "react";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  siteName?: string;
  noIndex?: boolean;
};

export default function SEO({
  title = "AIX ALEPH — Agent OS for Mobility",
  description = "Human ♥ AI — Der Herzschlag für saubere, leise Mobilität. Orchestrierung von E-Depots, Flottensteuerung, Ladeinfrastruktur, Realtime Fabric & Trust Layer.",
  url = "https://aixaleph.com/",
  image = "/og/aix-aleph-og.jpg",
  siteName = "AIX ALEPH",
  noIndex = false,
}: SEOProps) {
  React.useEffect(() => {
    if (title) document.title = title;

    const set = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setProp = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    set("description", description);
    if (noIndex) set("robots", "noindex,nofollow");

    // Open Graph
    setProp("og:type", "website");
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:url", url);
    setProp("og:site_name", siteName);
    setProp("og:image", image);

    // Twitter
    set("twitter:card", "summary_large_image");
    set("twitter:title", title);
    set("twitter:description", description);
    set("twitter:image", image);
  }, [title, description, url, image, siteName, noIndex]);

  return null;
}
