# Im Projekt-Root nach 'npm run build':
# A) SW-Registrierung aus der gebauten index.html entfernen
sed -i '' '/registerSW\.js/d' web/index.html

# B) Alle SW-Artefakte löschen (damit kein neuer SW installiert wird)
rm -f web/registerSW.js web/sw.js web/workbox-*.js
