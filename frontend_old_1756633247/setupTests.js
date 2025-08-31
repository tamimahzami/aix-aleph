cat > src/setupTests.js <<'EOF'
// src/setupTests.js

import "@testing-library/jest-dom";
import "whatwg-fetch";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, def) => (def ?? key),
    i18n: { language: "de", changeLanguage: () => {} },
  }),
  Trans: ({ children }) => children,
}));

jest.setTimeout(30000);

const origError = console.error;
console.error = (...args) => {
  const msg = args?.[0];
  if (
    typeof msg === "string" &&
    (msg.includes("Warning: An update to") ||
     msg.includes("act(...)") ||
     msg.includes("Not wrapped in act"))
  ) {
    return;
  }
  origError(...args);
};
EOF
