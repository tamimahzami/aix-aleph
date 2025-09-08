import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function DiscordLayout() {
  const { pathname } = useLocation();

  // Titel aus Route ableiten
  const title = pathname.startsWith("/experiments")
    ? "experimente"
    : pathname.startsWith("/login")
    ? "login"
    : "willkommen";

  return (
    <div className="disc-app">
      {/* Server-Leiste */}
      <aside className="server-list">
        <div className="server-icon">A</div>
        <div className="server-divider"></div>
        <div className="server-icon"><i className="fas fa-home" /></div>
        <div className="server-icon"><i className="fas fa-car" /></div>
        <div className="server-icon"><i className="fas fa-charging-station" /></div>
        <div className="server-icon"><i className="fas fa-brain" /></div>
        <div className="server-icon"><i className="fas fa-sliders-h" /></div>
      </aside>

      {/* Channel-Sidebar */}
      <aside className="channel-sidebar">
        <div className="server-header">
          <i className="fas fa-bolt" />
          <span>Air Aleph Mobility</span>
        </div>

        <div className="channel-category">Hauptkanäle</div>
        <NavLink to="/" end className={({isActive}) => `channel-link ${isActive ? "active" : ""}`}>
          <i className="fas fa-hashtag" /> Willkommen
        </NavLink>
        <a className="channel-link" href="#"><i className="fas fa-hashtag" /> News</a>
        <a className="channel-link" href="#"><i className="fas fa-hashtag" /> Produkte</a>

        <div className="channel-category">Mobility</div>
        <a className="channel-link" href="#"><i className="fas fa-car-battery" /> E-Mobilität</a>
        <a className="channel-link" href="#"><i className="fas fa-bus" /> ÖPNV-Lösungen</a>
        <a className="channel-link" href="#"><i className="fas fa-truck" /> Logistik</a>

        <div className="channel-category">AIX Aleph</div>
        <NavLink to="/experiments" className={({isActive}) => `channel-link ${isActive ? "active" : ""}`}>
          <i className="fas fa-vial" /> Experimente
        </NavLink>
        <NavLink to="/login" className={({isActive}) => `channel-link ${isActive ? "active" : ""}`}>
          <i className="fas fa-user" /> Login
        </NavLink>
      </aside>

      {/* Content */}
      <section className="content-col">
        <div className="channel-header">
          <div className="channel-title">
            <i className="fas fa-hashtag" />
            <span style={{ textTransform: "capitalize" }}>{title}</span>
          </div>
        </div>

        <div className="messages-container">
          <Outlet />
        </div>

        <div className="input-area">
          <textarea className="message-input" placeholder={`Nachricht an #${title} senden`} />
        </div>

        <footer className="discord-footer">
          <div className="footer-info">
            <div className="footer-logo">AIX <span>Aleph</span></div>
            <div className="footer-text">© {new Date().getFullYear()} Ahzami Automotive UG. Alle Rechte vorbehalten.</div>
          </div>
          <div className="footer-links">
            <a href="#">Datenschutz</a>
            <a href="#">Impressum</a>
            <a href="#">Nutzungsbedingungen</a>
          </div>
        </footer>
      </section>
    </div>
  );
}
