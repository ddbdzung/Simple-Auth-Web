import { ErrorBoundary } from "react-error-boundary"

import { Routes, Route } from "react-router-dom";

import AuthenticationRoute from "./features/auth/components/AuthenticationRoute";
import ErrorFallback from "./shared/ErrorBoundary";
import AppLayout from "./shared/AppLayout";
import Counter from "./features/game/Counter";
import NotFoundPage from "./shared/NotFoundPage";
import Test from "./shared/Test";
import PrivateRoute from "./shared/PrivateRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ForbiddenPage from "./shared/ForbiddenPage";
import PublicLayout from './features/public/publicLayout'

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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => { window.location.reload(); }}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={
            <PublicLayout />
          } />
          <Route path="/game" element={
            <Counter />
          } />
          <Route path="/test" element={
            <Test />
          } />
        </Route>
        <Route path="/auth/*" element={<AuthenticationRoute />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </ErrorBoundary >
  );
}

export default App;
