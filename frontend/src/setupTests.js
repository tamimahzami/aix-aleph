// src/setupTests.js

// --- i18next stabil mocken (verhindert Hänger durch async-Ladevorgänge) ---
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, def) => (def ? def : key),
    i18n: { changeLanguage: () => Promise.resolve(), language: 'de' },
  }),
  Trans: ({ children }) => children,
}));

// --- react-leaflet stub (falls Karten irgendwo importiert werden) ---
jest.mock('react-leaflet', () => {
  const React = require('react');
  const Stub = ({ children }) => React.createElement('div', null, children);
  return {
    MapContainer: Stub,
    TileLayer: Stub,
    Marker: Stub,
    Popup: Stub,
    useMap: () => ({}),
    useMapEvent: () => ({}),
    useMapEvents: () => ({}),
  };
});

// --- Testing-Library Extras & fetch-Polyfill ---
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// --- localStorage Mock (für Theme/Prefs) ---
class LocalStorageMock {
  store = {};
  getItem = (k) => (k in this.store ? this.store[k] : null);
  setItem = (k, v) => { this.store[k] = String(v); };
  removeItem = (k) => { delete this.store[k]; };
  clear = () => { this.store = {}; };
}
Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

// --- matchMedia Mock (für CSS-MediaQueries/useMediaQuery) ---
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// --- IntersectionObserver Mock ---
if (!('IntersectionObserver' in window)) {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  Object.defineProperty(window, 'IntersectionObserver', { value: IO });
  Object.defineProperty(global, 'IntersectionObserver', { value: IO });
}

// --- ResizeObserver Mock ---
if (!('ResizeObserver' in window)) {
  class RO { observe(){} unobserve(){} disconnect(){} }
  Object.defineProperty(window, 'ResizeObserver', { value: RO });
}

// --- scrollTo noop (verhindert jsdom-Fehler) ---
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

// --- optional: laute, irrelevante React-Fehler in Tests filtern ---
const origError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const msg = args[0] && String(args[0]);
    // Beispiele für nervige, aber in SMOKE-Tests irrelevante Warnungen:
    if (
      /Warning: An update to .* inside a test was not wrapped in act/.test(msg) ||
      /React Router/i.test(msg)
    ) {
      return;
    }
    origError(...args);
  };
});
afterAll(() => {
  console.error = origError;
});
