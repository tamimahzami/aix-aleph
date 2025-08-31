# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# 🌍 AIX ALEPH Mobility

**Globale Plattform für nachhaltige Mobilität und Flottenmanagement.**  
Von Bussen über LKWs, Transporter, PKWs bis hin zu Motorrädern und Fahrrädern –  
AIX ALEPH Mobility verbindet **Nachhaltigkeit mit Digitalisierung** und gibt volle Kontrolle über jede Form der Mobilität.

---

## 🚀 Projektüberblick

- **Projektname**: AIX ALEPH Mobility  
- **Ziel**: Aufbau einer global führenden Plattform für nachhaltige Mobilität & Flottenmanagement  
- **Vision**: Mobilität ohne Grenzen – ökologisch, technologisch, wirtschaftlich sinnvoll.  

---

## ⚙️ Infrastruktur

- Monorepo  
- **Frontend**: React (Vite, TypeScript)  
- **Backend**: Express (TypeScript)  
- **Dev**: Docker Compose für lokale Entwicklung  
- **Code-Qualität**: ESLint & Prettier eingerichtet  

---

## 🎨 Frontend

### Landingpage (`Home.jsx`)
- **Hero-Section**: Titel, Untertitel, Call-to-Action („Demo anfordern“, „Jetzt starten“)  
- **Mission**: Warum Mobilitätstransformation notwendig ist  
- **Transformation**: Probleme ohne Plattform → Lösungen mit AIX ALEPH (Echtzeit-Monitoring, KI-Prognosen, Ladeoptimierung)  
- **Zielgruppen**: Länder, Städte, Kommunen, Unternehmen  
- **Features**: Flottenmanagement, Ladeoptimierung, Vernetzung  
- **Über uns**: >3 Jahre Entwicklung  
- **CTA-Section**: Demo & Kontakt  

### Footer (`Footer.jsx`)
- **Unternehmensinfo**  
- **Fahrzeugmanagement**  
- **Lösungen**: Business, Cities, Government  
- **Ressourcen**: Blog, Case Studies, Webinare, API-Docs  
- **Rechtliches**: Datenschutz, Nutzungsbedingungen, Impressum, Cookies  
- **Kontakt** + Copyright  

---

## 📄 Unterseiten

Alle im Footer verlinkten Seiten sind als eigene React Pages angelegt:  

- **Lösungen**: Business, Cities, Government  
- **Ressourcen**: Blog, CaseStudies, Webinars, ApiDocs  
- **Rechtliches**: Privacy, Terms, Imprint, Cookies  
- **CTA-Pages**: Demo, Register, Contact  
- **404-Page** (`NotFound.jsx`)  

---

## 🛣️ Routing

- Alle Routen in `App.jsx` konfiguriert  
- `BrowserRouter` in `main.tsx` eingebunden  
- Redirects:
  - `/impressum → /imprint`  
  - `/datenschutz → /privacy`  

---

## 🎨 Styling

- Eigene Stylesheets:
  - `home.css` → Landingpage  
  - `footer.css` → Footer  
  - `page.css` → Unterseiten  
- Responsive: CSS Grid & Flexbox  
- Hover-Effekte, Icons (FontAwesome), visuelle Akzente  

---

## 📌 Roadmap

- [ ] Auth-Flow finalisieren (Login, Register, Reset)  
- [ ] Dashboard mit Live-Map (Leaflet)  
- [ ] API-Integration fürs Backend  
- [ ] Deployment (Docker + CI/CD)  
- [ ] Weitere Design-Optimierungen für Präsentation  

---

## 🧑‍💻 Setup

```bash
# Repo klonen
git clone <repo-url>
cd aix-aleph-mobility

# Dependencies installieren
npm install

# Entwicklung starten
npm run dev

# Backend starten
npm run dev:server

# Mit Docker
docker-compose up --build
