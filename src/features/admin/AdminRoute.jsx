import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../../shared/PrivateRoute";

import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";

export default function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

