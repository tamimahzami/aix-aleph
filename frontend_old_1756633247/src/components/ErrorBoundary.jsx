import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("UI crashed:", error, info); }

  render() {
    if (this.state.error) {
      return (
        <div style={{padding:16, fontFamily:"system-ui, sans-serif"}}>
          <h2>Etwas ist schiefgelaufen 😬</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
