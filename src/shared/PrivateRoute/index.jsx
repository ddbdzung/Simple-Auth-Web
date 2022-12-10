import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const { access, refresh } = useSelector(store => store.auth)

  if (!access || !refresh) {
    return <Navigate to='/auth/sign-in' />
  }

  const { role } = jwt_decode(access)
  if (role === 'user') {
    return <Navigate to='/auth/sign-in' />
  }

  return children
}

export default PrivateRoute
