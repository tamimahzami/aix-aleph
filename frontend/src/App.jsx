// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

// Frame
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import ContainerMax from "./components/common/ContainerMax.jsx";
import AiChat from "./components/chat/AiChat.jsx";

// Core pages (lazy)
const Landing      = lazy(() => import("./pages/Landing.jsx"));
const Demo         = lazy(() => import("./pages/Demo.jsx"));
const Dashboard    = lazy(() => import("./pages/Dashboard.jsx"));
const Preise       = lazy(() => import("./pages/Preise.jsx"));
const Plan         = lazy(() => import("./pages/Plan.jsx"));
const About        = lazy(() => import("./pages/About.jsx"));

// Auth
const Login        = lazy(() => import("./pages/auth/Login.jsx"));
const Register     = lazy(() => import("./pages/auth/Register.jsx"));

// Legal
const Impressum    = lazy(() => import("./pages/legal/Impressum.jsx"));
const Datenschutz  = lazy(() => import("./pages/legal/Datenschutz.jsx"));
const AGB          = lazy(() => import("./pages/legal/AGB.jsx"));
const Cookies      = lazy(() => import("./pages/legal/Cookies.jsx"));

// Footer/Support extras
const Status           = lazy(() => import("./pages/Status.jsx"));
const Feedback         = lazy(() => import("./pages/Feedback.jsx"));
const Guidelines       = lazy(() => import("./pages/Guidelines.jsx"));
const Acknowledgements = lazy(() => import("./pages/Acknowledgements.jsx"));
const Licenses         = lazy(() => import("./pages/Licenses.jsx"));

// Fallback
const NotFound      = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <ThemeProvider>
      <div className="site-shell min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Suspense
            fallback={
              <section className="page-section">
                <ContainerMax>
                  <div className="card">
                    <div className="animate-pulse">Lade Inhalte…</div>
                  </div>
                </ContainerMax>
              </section>
            }
          >
            <Routes>
              {/* Primary */}
              <Route path="/"             element={<Landing />} />
              <Route path="/start"        element={<Demo />} />
              <Route path="/demo"         element={<Demo />} />
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/preise"       element={<Preise />} />
              <Route path="/plan"         element={<Plan />} />
              <Route path="/about"        element={<About />} />

              {/* Auth */}
              <Route path="/login"        element={<Login />} />
              <Route path="/register"     element={<Register />} />

              {/* Legal */}
              <Route path="/legal/impressum"    element={<Impressum />} />
              <Route path="/legal/datenschutz"  element={<Datenschutz />} />
              <Route path="/legal/agb"          element={<AGB />} />
              <Route path="/legal/cookies"      element={<Cookies />} />

              {/* Footer/Support */}
              <Route path="/status"             element={<Status />} />
              <Route path="/feedback"           element={<Feedback />} />
              <Route path="/guidelines"         element={<Guidelines />} />
              <Route path="/acknowledgements"   element={<Acknowledgements />} />
              <Route path="/licenses"           element={<Licenses />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {/* Floating AI Chat */}
        <AiChat />
      </div>
    </ThemeProvider>
  );
}
