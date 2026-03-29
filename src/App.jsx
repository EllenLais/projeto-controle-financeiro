import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { FullscreenLoader } from "./components/feedback/FullscreenLoader";
import { AuthLayout } from "./components/layout/AuthLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";

const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((module) => ({ default: module.DashboardPage }))
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((module) => ({ default: module.RegisterPage }))
);

function App() {
  return (
    <Suspense fallback={<FullscreenLoader label="Preparando interface..." />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PublicRoute>
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
