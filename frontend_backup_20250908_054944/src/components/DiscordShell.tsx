import { NavLink, Outlet } from "react-router-dom";

export default function DiscordShell() {
  return (
    <div className="app-shell">
      {/* Servers Sidebar (links) */}
      <aside className="servers-sidebar">
        <div className="server-icon active" title="AIX Aleph">
          <i className="fas fa-robot" />
        </div>
        <div className="server-divider" />
        <div className="server-icon" title="Home">
          <i className="fas fa-home" />
        </div>
        <div className="server-icon" title="Analytics">
          <i className="fas fa-chart-line" />
        </div>
        <div className="server-icon" title="Settings">
          <i className="fas fa-cog" />
        </div>
      </aside>

      {/* Channels Sidebar */}
      <nav className="channels-sidebar">
        <div className="server-header">AIX Aleph Platform</div>
        <div className="channels-container">
          <div className="channel-category">Navigation</div>

          <NavLink to="/home" className={({ isActive }) => `channel ${isActive ? "active" : ""}`}>
            <i className="fas fa-hashtag" />
            Startseite
          </NavLink>

          <NavLink to="/features" className={({ isActive }) => `channel ${isActive ? "active" : ""}`}>
            <i className="fas fa-hashtag" />
            Funktionen
          </NavLink>

          <NavLink to="/pricing" className={({ isActive }) => `channel ${isActive ? "active" : ""}`}>
            <i className="fas fa-hashtag" />
            Preise
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => `channel ${isActive ? "active" : ""}`}>
            <i className="fas fa-hashtag" />
            Dashboard
          </NavLink>
        </div>

        <div className="user-panel">
          <div className="user-info">
            <div className="user-avatar">TM</div>
            <div>
              <div className="user-name">Tamim</div>
              <div className="user-status">#0001</div>
            </div>
          </div>
          <div className="user-controls">
            <i className="fas fa-microphone" />
            <i className="fas fa-headphones" />
            <i className="fas fa-cog" />
          </div>
        </div>
      </nav>

      {/* Main content + optional right sidebar placeholder */}
      <main className="main-content">
        <div className="channel-header">
          <div className="channel-title">
            <i className="fas fa-hashtag" />
            <span id="channel-title-text">AIX Aleph</span>
          </div>
        </div>

        <div className="page-content">
          <Outlet />
        </div>

        <div className="input-container">
          <input type="text" placeholder="Nachricht an #AIX Aleph senden" />
          <i className="fas fa-plus" />
          <i className="fas fa-gift" />
          <i className="fas fa-grin" />
        </div>
      </main>

      <aside className="members-sidebar">
        <div className="members-title">Mitglieder — 3</div>
        <div className="member">
          <div className="member-avatar">
            TM
            <div className="member-status" style={{ backgroundColor: "#3ba55d" }} />
          </div>
          <div className="member-name">Tamim</div>
        </div>
        <div className="member">
          <div className="member-avatar">
            AA
            <div className="member-status" style={{ backgroundColor: "#faa81a" }} />
          </div>
          <div className="member-name">AIX Aleph</div>
        </div>
        <div className="member">
          <div className="member-avatar">
            SYS
            <div className="member-status" style={{ backgroundColor: "#ed4245" }} />
          </div>
          <div className="member-name">System</div>
        </div>
      </aside>
    </div>
  );
}
