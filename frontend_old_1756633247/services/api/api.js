// services/api.js

// --- kleine Fetch-Utility mit Timeout ---
async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// --- Hilfsfunktion: Payload sauber erstellen ---
export function createRegistrationPayload({
  // Person
  firstName,
  lastName,
  position,
  phone,
  email,
  password,

  // Firma
  company,
  companyType,
  vatId,
  taxId,
  commercialRegister,

  // Adresse
  street,
  streetNumber,
  zipCode,
  city,
  country,

  // Plan & Zahlung
  plan,
  paymentMethod,
  paymentToken, // nur wenn du später PSP-Tokenisierung einbaust
}) {
  const trim = (v) => (typeof v === "string" ? v.trim() : v);

  const payload = {
    firstName: trim(firstName),
    lastName: trim(lastName),
    email: trim(email)?.toLowerCase(),
    password, // bewusst ungetrimmt
  };

  if (position && trim(position)) payload.position = trim(position);
  if (phone && trim(phone)) payload.phone = trim(phone);

  if (company && trim(company)) payload.company = trim(company);
  if (companyType) payload.companyType = companyType;
  if (vatId && trim(vatId)) payload.vatId = trim(vatId);
  if (taxId && trim(taxId)) payload.taxId = trim(taxId);
  if (commercialRegister && trim(commercialRegister))
    payload.commercialRegister = trim(commercialRegister);

  // Adresse nur anhängen, wenn Straße vorhanden ist
  if (street && trim(street)) {
    payload.address = {
      street: trim(street),
      streetNumber: streetNumber ? trim(streetNumber) : undefined,
      zipCode: zipCode ? trim(zipCode) : "",
      city: city ? trim(city) : "",
      country: country ? trim(country) : "DE",
    };
    // undefined-Felder entfernen
    Object.keys(payload.address).forEach(
      (k) => payload.address[k] === undefined && delete payload.address[k]
    );
  }

  if (plan) payload.plan = plan; // "starter" | "pro" | "enterprise"
  if (paymentMethod) payload.paymentMethod = paymentMethod; // "credit" | "paypal" | "invoice"
  if (paymentToken) payload.paymentToken = paymentToken; // erst mit PSP benutzen

  return payload;
}

// --- Fehler harmonisieren ---
function normalizeApiError(err, fallbackMessage = "Registrierung fehlgeschlagen.") {
  // Timeout
  if (err?.name === "AbortError" || err?.code === "TIMEOUT") {
    const e = new Error("Registrierungsanfrage abgelaufen (Timeout).");
    e.code = "TIMEOUT";
    return e;
  }
  // Netzwerk
  if (!err?.status) {
    const e = new Error(err?.message || "Netzwerkfehler bei der Registrierung.");
    e.code = "NETWORK_ERROR";
    return e;
  }
  // API-Fehler mit Status
  const e = new Error(err.message || fallbackMessage);
  e.status = err.status;
  e.details = err.details || null;
  // gängige Codes mappen
  if (err.status === 409) e.code = "USER_EXISTS";
  else if (err.status === 400) e.code = "INVALID_DATA";
  else if (err.status === 422) e.code = "VALIDATION_ERROR";
  else if (err.status === 401) e.code = "UNAUTHORIZED";
  else if (err.status === 429) e.code = "RATE_LIMIT";
  return e;
}

// --- Hauptfunktion: Register ---
export async function register(payload) {
  // 1) Basale Eingangsvalidierung (Client-seitig)
  if (!payload || typeof payload !== "object") {
    throw new Error("Ungültiges Payload-Objekt");
  }
  const required = ["firstName", "lastName", "email", "password"];
  const missing = required.filter((f) => !payload[f]);
  if (missing.length) {
    throw new Error(`Erforderliche Felder fehlen: ${missing.join(", ")}`);
  }
  // E-Mail-Format
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(payload.email)) {
    throw new Error("Ungültiges E-Mail-Format");
  }
  // Adresse falls vorhanden
  if (payload.address) {
    const reqAddr = ["street", "zipCode", "city", "country"];
    const missAddr = reqAddr.filter((f) => !payload.address[f]);
    if (missAddr.length) {
      throw new Error(`Erforderliche Adressfelder fehlen: ${missAddr.join(", ")}`);
    }
  }

  try {
    // 2) Request mit Timeout
    const res = await fetchWithTimeout(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Version": "1.0",
        },
        body: JSON.stringify(payload),
      },
      30000
    );

    // 3) Antwort behandeln
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      let details = null;
      try {
        const asJson = await res.json();
        msg = asJson.message || asJson.error || msg;
        details = asJson.details || asJson.validation || null;
      } catch {
        try {
          msg = (await res.text()) || msg;
        } catch {
          /* ignore */
        }
      }
      const err = new Error(msg);
      err.status = res.status;
      err.details = details;
      throw err;
    }

    // 4) Erfolg
    let data = null;
    try {
      data = await res.json();
    } catch {
      // 201 ohne Body o.ä.
      data = { ok: true, status: res.status, message: "Registrierung erfolgreich." };
    }

    // 5) Logging (ohne sensible Felder)
    try {
      // eslint-disable-next-line no-console
      console.log("Registrierung erfolgreich:", { email: payload.email, plan: payload.plan });
    } catch {}
    return data;
  } catch (err) {
    // Timeout?
    if (err?.name === "AbortError") {
      const e = new Error("Registrierungsanfrage abgelaufen (Timeout).");
      e.code = "TIMEOUT";
      throw e;
    }
    // Netzwerk oder bereits strukturierter API-Fehler
    throw normalizeApiError(err);
  }
}
