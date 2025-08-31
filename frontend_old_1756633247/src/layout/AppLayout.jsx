import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <main id="main-content" className="main">{children}</main>
      <Footer />
    </div>
  );
}
