# 📂 public/

Dieses Verzeichnis enthält statische Assets, die direkt von der Anwendung abgerufen werden, ohne von Build-Tools verarbeitet zu werden. Dazu gehören Favicons, das Web-App-Manifest und andere statische Dateien.

## 5) Assets in `public/`

Bitte stellen Sie sicher, dass die folgenden Dateien im `public/` Verzeichnis abgelegt sind, damit sie von der `index.html` korrekt verlinkt werden können.

* `favicon.svg`: Das Haupt-Favicon im SVG-Format.
* `favicon-192.png`: Ein PNG-Icon in der Größe 192x192 Pixel.
* `favicon-512.png`: Ein PNG-Icon in der Größe 512x512 Pixel.
* `manifest.json`: Die Konfigurationsdatei für Progressive Web Apps (PWA).

**Hinweis:**  
Sie können `apple-touch-icon.png` (180x180 Pixel) ebenfalls ablegen, um eine konsistente Anzeige auf iOS-Geräten zu gewährleisten. Die `index.html` verlinkt bereits auf diese Datei.

---

## 📌 Best Practices

- Dateinamen **genau so** verwenden wie oben angegeben, sonst findet der Browser sie nicht.  
- Immer **SVG + PNG** kombinieren → maximale Kompatibilität.  
- Manifest nach jedem Branding-Update prüfen (`manifest.json`).  
- Für iOS Homescreen-Tests: `apple-touch-icon.png` nicht vergessen.  
- Favicons und Manifest in allen Browsern (Chrome, Firefox, Safari, Edge) kurz testen.  
