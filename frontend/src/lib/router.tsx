// src/lib/router.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Experiments from "../pages/Experiments";
import ExperimentDetail from "../pages/ExperimentDetail";
import NotFound from "../pages/NotFound";

const withLayout = (el: React.ReactNode) => <Layout>{el}</Layout>;

const router = createBrowserRouter([
  { path: "/", element: withLayout(<Home />) },
  { path: "/dashboard", element: withLayout(<Dashboard />) },
  { path: "/experiments", element: withLayout(<Experiments />) },
  { path: "/experiments/:id", element: withLayout(<ExperimentDetail />) },
  { path: "*", element: withLayout(<NotFound />) },
]);

export default router;
