import { ErrorBoundary } from "react-error-boundary"

import { Routes, Route } from "react-router-dom";

import AuthenticationRoute from "./features/auth/components/AuthenticationRoute";
import ErrorFallback from "./shared/ErrorBoundary";
// import PrivateRoute from "./shared/PrivateRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ForbiddenPage from "./shared/ForbiddenPage";
import PublicRoute from "./features/public/PublicRoute";
import NotFoundPage from "./shared/NotFoundPage";

function App() {
  const { username } = useSelector(store => store.auth)

  useEffect(() => {
    if (username) {
      document.title = username
    }

    return () => {
      if (username) {
        document.title = username
      }
    }
  })
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => { window.location.reload(); }}>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />

          <Route path="/auth/*" element={<AuthenticationRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary >
    </>
  );
}

export default App;
