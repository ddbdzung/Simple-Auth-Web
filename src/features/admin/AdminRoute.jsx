import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../../shared/PrivateRoute";
import AdminLayout from "./AdminLayout";
import Brand from "./pages/Brand";
import Catalog from "./pages/Catalog";
import BrandCreation from "./pages/creation/BrandCreation";
import CatalogCreation from "./pages/creation/CatalogCreation";
import ProductCreation from "./pages/creation/ProductCreation";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import BrandDetail from "./pages/detail/BrandDetail";
import CatalogDetail from "./pages/detail/CatalogDetail";
import ProductDetail from "./pages/detail/ProductDetail";
import Invoice from "./pages/Invoice";
import Order from "./pages/Order";
import Product from "./pages/Product";
import BrandUpdate from "./pages/update/BrandUpdate";
import CatalogUpdate from "./pages/update/CatalogUpdate";
import ProductUpdate from "./pages/update/ProductUpdate";

export default function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="customer" element={
          <PrivateRoute>
            <Customer />
          </PrivateRoute>
        } />
        <Route path="brand" element={
          <PrivateRoute>
            <Brand />
          </PrivateRoute>
        } />
        <Route path="brand/:id" element={
          <PrivateRoute>
            <BrandDetail />
          </PrivateRoute>
        } />
        <Route path="brand/create" element={
          <PrivateRoute>
            <BrandCreation />
          </PrivateRoute>
        } />
        <Route path="brand/:id/e" element={
          <PrivateRoute>
            <BrandUpdate />
          </PrivateRoute>
        } />
        <Route path="catalog" element={
          <PrivateRoute>
            <Catalog />
          </PrivateRoute>
        } />
        <Route path="catalog/:id" element={
          <PrivateRoute>
            <CatalogDetail />
          </PrivateRoute>
        } />
        <Route path="catalog/create" element={
          <PrivateRoute>
            <CatalogCreation />
          </PrivateRoute>
        } />
        <Route path="catalog/:id/e" element={
          <PrivateRoute>
            <CatalogUpdate />
          </PrivateRoute>
        } />
        <Route path="invoice" element={
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        } />
        <Route path="order" element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        } />
        <Route path="product" element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        } />
        <Route path="product/:id" element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } />
        <Route path="product/create" element={
          <PrivateRoute>
            <ProductCreation />
          </PrivateRoute>
        } />
        <Route path="product/:id/e" element={
          <PrivateRoute>
            <ProductUpdate />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

