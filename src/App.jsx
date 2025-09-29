// src/App.jsx
import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DevCatch } from "./DevCatch.jsx";

// helper: لو فشل الاستيراد يطلع سبب واضح
const withMsg = (p, name) =>
  p().catch((e) => { throw new Error(`❌ Failed to load ${name}: ${e.message}`); });

// ⬅️ حتى الـLayout صار lazy
const Layout      = lazy(() => withMsg(() => import("./Layout.jsx"),        "Layout.jsx"));
const Dashboard   = lazy(() => withMsg(() => import("./Pages/Dashboard.jsx"),"Dashboard.jsx"));
const Alert       = lazy(() => withMsg(() => import("./Pages/Alert.jsx"),    "Alert.jsx"));
const Analytics   = lazy(() => withMsg(() => import("./Pages/Analytics.jsx"),"Analytics.jsx"));
const Maintenance = lazy(() => withMsg(() => import("./Pages/Maintenance.jsx"),"Maintenance.jsx"));
const Report      = lazy(() => withMsg(() => import("./Pages/Report.jsx"),   "Report.jsx"));

function Fallback() {
  const loc = useLocation();
  return (
    <div style={{padding:12, fontFamily:"ui-monospace,monospace", color:"#9aa4af"}}>
      Loading… <small>({loc.pathname})</small>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <DevCatch>
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route path="/"            element={<Dashboard />} />
                <Route path="/alerts"      element={<Alert />} />
                <Route path="/analytics"   element={<Analytics />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/reports"     element={<Report />} />
                <Route path="*"            element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </Suspense>
      </DevCatch>
    </HashRouter>
  );
}
