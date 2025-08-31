// src/pages/ContactPage.jsx
import React, { useState } from "react";
import styles from "../styles/Page.module.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Optional: zentrales Logo-Element – falls vorhanden
// import AAMLogo from "../components/AAMLogo";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

export default function ContactPage() {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [hp, setHp] = useState(""); // Honeypot (soll leer bleiben)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk(false);

    if (hp) {
      // Bot-Verdacht – tue so als ob's geklappt hätte
      setOk(true);
      return;
    }
    if (!emailOk(formData.email)) {
      setErr("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }

    setBusy(true);
    try {
      // TODO: hier später echten API-Call einbauen (z. B. /api/contact)
      // await api.sendContact(formData)
      await new Promise((r) => setTimeout(r, 700)); // Demo
      setOk(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (e2) {
      setErr("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Kopfbereich */}
      <div className={styles.pageHeader}>
        <h1>Kontakt</h1>
        <p>Wir freuen uns auf Ihre Fragen und Anregungen.</p>
      </div>

      {/* Hauptgrid */}
      <div className={styles.contactGrid}>
        {/* Infos & Karte */}
        <div className={styles.contactInfo}>
          {/* {<div className={styles.logoCenter}><AAMLogo size={100} /></div>} */}
          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.infoIcon} />
            <div>
              <h3>Unser Standort</h3>
              <p>Aachener Straße 1</p>
              <p>50674 Köln, Deutschland</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faPhone} className={styles.infoIcon} />
            <div>
              <h3>Telefon</h3>
              <p>+49 221 123456</p>
              <p>Mo–Fr: 9:00–18:00 Uhr</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.infoIcon} />
            <div>
              <h3>E-Mail</h3>
              <p>kontakt@aix-aleph.de</p>
              <p>support@aix-aleph.de</p>
            </div>
          </div>

          <div className={styles.mapContainer} aria-label="Standortkarte Köln">
            <iframe
              title="Standort Köln – AIX ALEPH Mobility"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10094.8441903477!2d6.943203315720266!3d50.93810637950503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf2590b13e0f6d%3A0x1cd82d7e8b7a2d5e!2sK%C3%B6ln!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Formular */}
        <div className={styles.contactForm}>
          <h2>Schreiben Sie uns</h2>

          {ok && <div className={styles.alertOk}>Vielen Dank! Ihre Nachricht wurde gesendet.</div>}
          {err && <div className={styles.alertErr}>{err}</div>}

          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot */}
            <div className={styles.hpField} aria-hidden="true">
              <label htmlFor="company">Firma</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={onChange}
                placeholder="Ihr Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={onChange}
                placeholder="name@firma.de"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Betreff</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={onChange}
                placeholder="Worum geht es?"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Nachricht</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={onChange}
                placeholder="Ihre Nachricht an uns…"
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={busy}>
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>{busy ? "Senden…" : "Nachricht senden"}</span>
            </button>
          </form>

          <p className={styles.privacyNote}>
            Mit dem Absenden stimmen Sie unserer{" "}
            <a href="/privacy">Datenschutzerklärung</a> zu.
          </p>
        </div>
      </div>
    </div>
  );
}
