import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "../../../shared/PublicRoute";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import AuthenticationLayout from "./AuthenticationLayout";

export default function AuthenticationRoute() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route index element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="sign-in" element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } />
        <Route path="sign-up" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Route>
    </Routes>
  )
}

