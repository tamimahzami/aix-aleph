// src/map/leafletIcons.js
import L from "leaflet";

/**
 * Behebt fehlende Standard-Icons, wenn Bundler die Asset-URLs umschreiben.
 * Aufruf: patchLeafletIcons()
 */
export function patchLeafletIcons() {
  // @ts-ignore (Leaflet intern)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
    shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
  });
}
