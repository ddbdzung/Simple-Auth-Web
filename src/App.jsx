import { ErrorBoundary } from "react-error-boundary"

import ErrorFallback from "./shared/ErrorBoundary";
import AuthenticationRoute from "./features/auth/components/AuthenticationRoute";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./shared/AppLayout";
import Counter from "./features/game/Counter";
import NotFoundPage from "./shared/NotFoundPage";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => { window.location.reload(); }}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/auth/*" element={<AuthenticationRoute />} />
          <Route path="/game" element={<Counter />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary >
  );
}

export default App;