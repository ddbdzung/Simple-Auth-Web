import { Routes, Route, Navigate } from "react-router-dom";

import ProductList from "../../components/ProductList";
import CartBeforeCheckout from "../../shared/CartBeforeCheckout";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import PublicLayout from "./PublicLayout";

export default function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<ProductList />} />
        <Route path="products" element={<Navigate to="/" replace />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={
          <CartBeforeCheckout>
            <Checkout />
          </CartBeforeCheckout>
        } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

