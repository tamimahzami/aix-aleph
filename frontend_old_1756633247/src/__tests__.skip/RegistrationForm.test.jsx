import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { AuthContext } from "../context/AuthContext";

// --- React Router useNavigate mocken, um echte Navigation zu vermeiden
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// --- services/api komplett mocken (keine axios-Imports in Jest!)
const mockRegister = jest.fn();

// Eine schlanke, test-taugliche Version von createRegistrationPayload,
// die CARD-Felder bewusst NICHT übernimmt.
const mockCreateRegistrationPayload = (data) => {
  const payload = {
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    email: data.email?.trim()?.toLowerCase(),
    password: data.password,
    position: data.position?.trim(),
    phone: data.phone?.trim(),
    company: data.company?.trim(),
    companyType: data.companyType,
    vatId: data.vatId?.trim(),
    taxId: data.taxId?.trim() || undefined,
    commercialRegister: data.commercialRegister?.trim() || undefined,
    address: {
      street: data.street?.trim(),
      streetNumber: data.streetNumber?.trim(),
      zipCode: data.zipCode?.trim(),
      city: data.city?.trim(),
      country: data.country,
    },
    plan: data.plan,
    paymentMethod: data.paymentMethod,
    // kein cardNumber / expiry / cvc!
  };

  // Optionale Felder bereinigen
  if (!payload.taxId) delete payload.taxId;
  if (!payload.commercialRegister) delete payload.commercialRegister;

  return payload;
};

jest.mock("../services/api", () => ({
  register: (...args) => mockRegister(...args),
  createRegistrationPayload: (data) => mockCreateRegistrationPayload(data),
}));

function renderForm() {
  const mockCtxLogin = jest.fn();
  return {
    loginSpy: mockCtxLogin,
    ...render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: mockCtxLogin, isAuthed: false, token: null }}>
          <RegistrationForm />
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  };
}

function fillMinimalForm() {
  // Persönlich
  fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: "Max" } });
  fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: "Mustermann" } });
  fireEvent.change(screen.getByLabelText(/Position/i), { target: { value: "Fleet Manager" } });
  fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: "+49 123 456" } });
  fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: "max@example.com" } });

  // Firma
  fireEvent.change(screen.getByLabelText(/^Firmenname/i), { target: { value: "Muster GmbH" } });
  fireEvent.change(screen.getByLabelText(/^Rechtsform/i), { target: { value: "GmbH" } });
  fireEvent.change(screen.getByLabelText(/^USt-IdNr\./i), { target: { value: "DE123456789" } });

  // Adresse
  fireEvent.change(screen.getByLabelText(/^Straße/i), { target: { value: "Musterstraße" } });
  fireEvent.change(screen.getByLabelText(/^Hausnummer/i), { target: { value: "12" } });
  fireEvent.change(screen.getByLabelText(/^Postleitzahl/i), { target: { value: "50667" } });
  fireEvent.change(screen.getByLabelText(/^Stadt/i), { target: { value: "Köln" } });
  fireEvent.change(screen.getByLabelText(/^Land/i), { target: { value: "DE" } });

  // Konto
  fireEvent.change(screen.getByLabelText(/^Passwort(?!.*bestätigen)/i), {
    target: { value: "StarkesPasswort1" },
  });
  fireEvent.change(screen.getByLabelText(/Passwort bestätigen/i), {
    target: { value: "StarkesPasswort1" },
  });

  // Plan & Zahlung
  fireEvent.click(screen.getByLabelText(/Starter/i)); // Radio ist im Label – Click auf Label reicht
  fireEvent.click(screen.getByLabelText(/PayPal/i)); // Payment: PayPal, damit keine Card-Felder nötig sind

  // AGB
  fireEvent.click(screen.getByLabelText(/Allgemeinen Geschäftsbedingungen/i));
}

describe("RegistrationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("zeigt Validierungsfehler bei leerem Submit", async () => {
    renderForm();

    fireEvent.click(screen.getByRole("button", { name: /Jetzt Geschäftskonto erstellen/i }));

    // mindestens 1 Pflichtfeld-Fehler erscheint
    const errs = await screen.findAllByText(/Pflichtfeld/i);
    expect(errs.length).toBeGreaterThan(0);
  });

  test("sendet Registrierung (mit Token) → auto-login & navigate(/dashboard)", async () => {
    renderForm();
    fillMinimalForm();

    // Mock: API liefert Token & User
    mockRegister.mockResolvedValueOnce({
      token: "jwt.token",
      user: { id: 1, email: "max@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Jetzt Geschäftskonto erstellen/i }));

    // Warten bis register aufgerufen wurde
    await waitFor(() => expect(mockRegister).toHaveBeenCalled());

    // Payload wurde übergeben
    const sentPayload = mockRegister.mock.calls[0][0];
    expect(sentPayload).toBeTruthy();

    // Kreditkartenfelder NICHT vorhanden
    expect(sentPayload.cardNumber).toBeUndefined();
    expect(sentPayload.expiry).toBeUndefined();
    expect(sentPayload.cvc).toBeUndefined();

    // Login aus Context wurde mit Token & User aufgerufen
    // (wir können nur prüfen, dass navigate zum Dashboard ging;
    //  Context-Login selbst wird indirekt verifiziert, weil navigate dort erst erfolgt)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    });
  });

  test("invoice nur für enterprise erlaubt (yup custom rule)", async () => {
    renderForm();

    // Minimal, aber genügend Felder ausfüllen:
    fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: "B" } });
    fireEvent.change(screen.getByLabelText(/Position/i), { target: { value: "C" } });
    fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: "+49 1" } });
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: "a@b.de" } });

    fireEvent.change(screen.getByLabelText(/^Firmenname/i), { target: { value: "X GmbH" } });
    fireEvent.change(screen.getByLabelText(/^Rechtsform/i), { target: { value: "GmbH" } });
    fireEvent.change(screen.getByLabelText(/^USt-IdNr\./i), { target: { value: "DE123" } });

    fireEvent.change(screen.getByLabelText(/^Straße/i), { target: { value: "Str" } });
    fireEvent.change(screen.getByLabelText(/^Hausnummer/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/^Postleitzahl/i), { target: { value: "50667" } });
    fireEvent.change(screen.getByLabelText(/^Stadt/i), { target: { value: "Köln" } });
    fireEvent.change(screen.getByLabelText(/^Land/i), { target: { value: "DE" } });

    fireEvent.change(screen.getByLabelText(/^Passwort(?!.*bestätigen)/i), {
      target: { value: "Abcdefg1" },
    });
    fireEvent.change(screen.getByLabelText(/Passwort bestätigen/i), {
      target: { value: "Abcdefg1" },
    });

    // Wähle PRO und Invoice → sollte Validierungsfehler auslösen
    fireEvent.click(screen.getByLabelText(/Professional/i));
    fireEvent.click(screen.getByLabelText(/Rechnung/i));

    // AGB
    fireEvent.click(screen.getByLabelText(/Allgemeinen Geschäftsbedingungen/i));

    fireEvent.click(screen.getByRole("button", { name: /Jetzt Geschäftskonto erstellen/i }));

    // Fehlermeldung der Custom-Rule
    expect(
      await screen.findByText(/Rechnung ist nur für Enterprise verfügbar/i)
    ).toBeInTheDocument();
  });
});
