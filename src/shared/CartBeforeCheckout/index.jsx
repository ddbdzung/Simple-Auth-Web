import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const CartBeforeCheckout = ({ children }) => {
  const { cart } = useSelector(store => store.public)

  if (!cart || cart?.length === 0) {
    return <Navigate to='/cart' />
  }

  return children
}

export default CartBeforeCheckout
