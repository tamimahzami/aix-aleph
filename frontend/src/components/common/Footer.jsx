import React from "react";
import { Link } from "react-router-dom";
import ContainerMax from "./ContainerMax.jsx";

const Col = ({ title, children }) => (
  <div className="footer-col">
    <h4 className="footer-col-title">{title}</h4>
    <ul className="footer-list">{children}</ul>
  </div>
);

const Item = ({ to, children, external }) => {
  if (external) {
    return (
      <li>
        <a className="footer-link" href={to} target="_blank" rel="noreferrer">
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link className="footer-link" to={to}>{children}</Link>
    </li>
  );
};

export default function Footer(){
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root" role="contentinfo">
      <div className="footer-sep" />
      <ContainerMax>
        <div className="footer-grid">
          <Col title="Language">
            <Item to="#" external>Deutsch</Item>
            <Item to="#" external>English</Item>
          </Col>

          <Col title="Social">
            <Item to="#" external>Twitter</Item>
            <Item to="#" external>Instagram</Item>
            <Item to="#" external>Facebook</Item>
            <Item to="#" external>YouTube</Item>
            <Item to="#" external>TikTok</Item>
          </Col>

          <Col title="Download">
            <Item to="#" external>Nitro</Item>
            <Item to="/status">Status</Item>
            <Item to="#" external>App Directory</Item>
          </Col>

          <Col title="About">
            <Item to="/about">Company</Item>
            <Item to="#" external>Jobs</Item>
            <Item to="#" external>Brand</Item>
            <Item to="#" external>Newsroom</Item>
            <Item to="#" external>College</Item>
          </Col>

          <Col title="Support">
            <Item to="#" external>Safety</Item>
            <Item to="#" external>Blog</Item>
            <Item to="#" external>StreamKit</Item>
            <Item to="#" external>Creators</Item>
            <Item to="#" external>Community</Item>
            <Item to="#" external>Developers</Item>
            <Item to="#" external>Quests</Item>
            <Item to="#" external>Official 3rd Party Merch</Item>
            <Item to="/feedback">Feedback</Item>
          </Col>

          <Col title="Legal">
            <Item to="/legal/terms">Terms</Item>
            <Item to="/legal/datenschutz">Privacy</Item>
            <Item to="/legal/cookies">Cookie Settings</Item>
            <Item to="/guidelines">Guidelines</Item>
            <Item to="/acknowledgements">Acknowledgements</Item>
            <Item to="/licenses">Licenses</Item>
            <Item to="/legal/impressum">Company Information</Item>
          </Col>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">AIX Aleph</span>
          </div>
          <div className="footer-copy">
            © {year} AIX Aleph — Humane Computing Heartbeat
          </div>
        </div>
      </ContainerMax>
    </footer>
  );
}
