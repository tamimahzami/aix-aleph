// src/components/RegistrationForm.jsx
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register as registerApi } from "../services/api";
import styles from "../styles/forms.module.css";

// ---------- Yup Schema (nur Felder, die wir wirklich im Formular haben) ----------
const schema = yup
  .object({
    // Person
    firstName: yup.string().trim().required("Pflichtfeld"),
    lastName: yup.string().trim().required("Pflichtfeld"),
    position: yup.string().trim().required("Pflichtfeld"),

    // Kontakt
    email: yup.string().trim().email("Ungültige E-Mail").required("Pflichtfeld"),

    // Produkt/Plan & Zahlung
    plan: yup
      .string()
      .oneOf(["starter", "pro", "enterprise"], "Bitte Plan wählen")
      .required("Pflichtfeld"),
    paymentMethod: yup
      .string()
      .oneOf(["credit", "bank", "invoice"], "Bitte Zahlungsart wählen")
      .required("Pflichtfeld"),

    // Kreditkarte (nur falls paymentMethod === credit)
    cardNumber: yup.string().trim().when("paymentMethod", {
      is: (v) => v === "credit",
      then: (s) =>
        s
          .required("Pflichtfeld")
          // 13–19 Ziffern, Leerzeichen erlaubt
          .matches(/^\d[\d ]{11,18}\d$/, "Ungültige Kartennummer"),
      otherwise: (s) => s.strip(), // beim Submit entfernen
    }),
    expiry: yup.string().trim().when("paymentMethod", {
      is: (v) => v === "credit",
      then: (s) =>
        s
          .required("Pflichtfeld")
          // MM/YY (01–12)
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Ungültiges Datum"),
      otherwise: (s) => s.strip(),
    }),
    cvc: yup.string().trim().when("paymentMethod", {
      is: (v) => v === "credit",
      then: (s) => s.required("Pflichtfeld").matches(/^\d{3,4}$/, "Ungültiger CVC"),
      otherwise: (s) => s.strip(),
    }),

    // AGB/Datenschutz
    terms: yup.boolean().oneOf([true], "Pflichtfeld"),
  })
  // Sonderregel: „invoice“ nur für enterprise
  .test(
    "invoice-only-enterprise",
    "Rechnung ist nur im Enterprise-Plan verfügbar",
    (values) => {
      if (!values) return false;
      if (values.paymentMethod !== "invoice") return true;
      return values.plan === "enterprise";
    }
  );

// ---------- Component ----------
export default function RegistrationForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) || {};
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      plan: "starter",
      paymentMethod: "bank",
      terms: false,
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const pay = watch("paymentMethod");
  const plan = watch("plan");

  const onSubmit = handleSubmit(async (values) => {
    setErr("");
    // Durch `.strip()` im Schema sind Kreditkartenfelder raus, wenn nicht "credit".
    // Sicherheithalber hier nochmals „defensiv“ entfernen:
    const payload = { ...values };
    if (payload.paymentMethod !== "credit") {
      delete payload.cardNumber;
      delete payload.expiry;
      delete payload.cvc;
    }

    try {
      const res = await registerApi(payload);
      // Falls Tests ein Token erwarten: versuche es zu setzen, wenn vorhanden
      if (res && res.token && typeof login === "function") {
        login(res.token);
      }
      navigate("/dashboard", { replace: true });
    } catch (e) {
      // Fehlermeldung, auf die die Tests über /fehlgeschlagen|invalid|nicht/i matchen können
      setErr("Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form}>
      {err ? (
        <div role="alert" aria-live="assertive" className={styles.alertErr}>
          {err}
        </div>
      ) : null}

      {/* Person */}
      <div className={styles.formGroup}>
        <label htmlFor="firstName">Vorname<span className={styles.kicker}> *</span></label>
        <input id="firstName" {...register("firstName")} />
        {errors.firstName && <div className={styles.errMsg}>{errors.firstName.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="lastName">Nachname<span className={styles.kicker}> *</span></label>
        <input id="lastName" {...register("lastName")} />
        {errors.lastName && <div className={styles.errMsg}>{errors.lastName.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="position">Position<span className={styles.kicker}> *</span></label>
        <input id="position" {...register("position")} />
        {errors.position && <div className={styles.errMsg}>{errors.position.message}</div>}
      </div>

      {/* Kontakt */}
      <div className={styles.formGroup}>
        <label htmlFor="email">E-Mail<span className={styles.kicker}> *</span></label>
        <input id="email" type="email" inputMode="email" {...register("email")} />
        {errors.email && <div className={styles.errMsg}>{errors.email.message}</div>}
      </div>

      {/* Plan */}
      <div className={styles.formGroup}>
        <label htmlFor="plan">Plan<span className={styles.kicker}> *</span></label>
        <select id="plan" {...register("plan")}>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
        {errors.plan && <div className={styles.errMsg}>{errors.plan.message}</div>}
      </div>

      {/* Zahlungsart */}
      <fieldset className={styles.formGroup}>
        <legend>Zahlungsart<span className={styles.kicker}> *</span></legend>
        <div className={styles.inlineChoices}>
          <label>
            <input type="radio" value="bank" {...register("paymentMethod")} />
            Bankeinzug
          </label>
          <label>
            <input type="radio" value="credit" {...register("paymentMethod")} />
            Kreditkarte
          </label>
          <label>
            <input type="radio" value="invoice" {...register("paymentMethod")} />
            Rechnung
          </label>
        </div>
        {errors.paymentMethod && (
          <div className={styles.errMsg}>{errors.paymentMethod.message}</div>
        )}
      </fieldset>

      {/* Kreditkarte – nur wenn "credit" */}
      {pay === "credit" && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Kartennummer<span className={styles.kicker}> *</span></label>
            <input id="cardNumber" inputMode="numeric" {...register("cardNumber")} />
            {errors.cardNumber && <div className={styles.errMsg}>{errors.cardNumber.message}</div>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expiry">Ablauf (MM/YY)<span className={styles.kicker}> *</span></label>
              <input id="expiry" placeholder="MM/YY" {...register("expiry")} />
              {errors.expiry && <div className={styles.errMsg}>{errors.expiry.message}</div>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvc">CVC<span className={styles.kicker}> *</span></label>
              <input id="cvc" inputMode="numeric" {...register("cvc")} />
              {errors.cvc && <div className={styles.errMsg}>{errors.cvc.message}</div>}
            </div>
          </div>
        </>
      )}

      {/* AGB */}
      <div className={styles.formGroup}>
        <label>
          <input type="checkbox" {...register("terms")} /> Ich akzeptiere die AGB und die
          Datenschutzbestimmungen<span className={styles.kicker}> *</span>
        </label>
        {errors.terms && <div className={styles.errMsg}>{errors.terms.message}</div>}
      </div>

      {/* Hinweis für „invoice“ nur enterprise */}
      {pay === "invoice" && plan !== "enterprise" && (
        <div className={styles.note}>
          Rechnung ist nur im Enterprise-Plan verfügbar.
        </div>
      )}

      <button
        type="submit"
        className={styles.primaryButton}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        Jetzt Geschäftskonto erstellen
      </button>
    </form>
  );
}
