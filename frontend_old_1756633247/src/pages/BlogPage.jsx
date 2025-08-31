// src/pages/BlogPage.jsx
import React, { useState } from "react";
import styles from "../styles/Page.module.css";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Alle Kategorien");
  const [email, setEmail] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Die Zukunft der urbanen Mobilität: 5 Trends für 2025",
      excerpt:
        "Wie sich Städte weltweit auf die Mobilitätsrevolution vorbereiten und welche Rolle integrierte Plattformen spielen werden.",
      category: "Trends",
      date: "15. Mai 2024",
      readTime: "4 Min"
    },
    {
      id: 2,
      title: "Fallstudie: Wie Hamburg seine Busflotte elektrifizierte",
      excerpt:
        "Ein Blick hinter die Kulissen des größten E-Bus Projekts Norddeutschlands und die Rolle von AIX ALEPH Mobility.",
      category: "Fallstudien",
      date: "3. Mai 2024",
      readTime: "6 Min"
    },
    {
      id: 3,
      title:
        "Predictive Maintenance für E-Flotten: So sparen Sie bis zu 30% Betriebskosten",
      excerpt:
        "Wie vorausschauende Wartung die Verfügbarkeit Ihrer Flotte erhöht und Kosten senkt.",
      category: "Technologie",
      date: "22. April 2024",
      readTime: "5 Min"
    },
    {
      id: 4,
      title: "Integration von Mikromobilität in ÖPNV-Systeme",
      excerpt:
        "Erfahren Sie, wie Städte E-Scooter und Leihräder nahtlos in ihr Verkehrskonzept integrieren.",
      category: "Lösungen",
      date: "10. April 2024",
      readTime: "7 Min"
    }
  ];

  const categories = [
    "Alle Kategorien",
    "Trends",
    "Technologie",
    "Lösungen",
    "Fallstudien",
    "Politik & Regulierung"
  ];

  const filteredPosts =
    activeCategory === "Alle Kategorien"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Vielen Dank für Ihr Abo (${email})!`);
    setEmail("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>Blog & Insights</h1>
        <p>Aktuelle Einblicke in die Welt der nachhaltigen Mobilität</p>
      </div>

      {/* Kategorien Filter */}
      <div className={styles.blogCategories}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className={styles.blogGrid}>
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
        {filteredPosts.length === 0 && (
          <p className={styles.emptyMsg}>
            Keine Beiträge in dieser Kategorie gefunden.
          </p>
        )}
      </div>

      {/* Newsletter */}
      <div className={styles.newsletter}>
        <h2>Bleiben Sie informiert</h2>
        <p>
          Abonnieren Sie unseren Newsletter und erhalten Sie monatlich Insights
          zur Mobilitätswende.
        </p>
        <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Abonnieren</button>
        </form>
      </div>
    </div>
  );
}

export default BlogPage;
