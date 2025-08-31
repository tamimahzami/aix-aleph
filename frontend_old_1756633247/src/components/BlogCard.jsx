import React from "react";
import styles from "../styles/Page.module.css";

export default function BlogCard({ post }) {
  return (
    <article className={styles.projectCard}>
      <header>
        <small>{post.category} · {post.date} · {post.readTime}</small>
        <h3 style={{ marginTop: 6 }}>{post.title}</h3>
      </header>
      <p>{post.excerpt}</p>
      {post.link ? <a className={styles.ctaButton} href={post.link}>Weiterlesen</a> : null}
    </article>
  );
}
