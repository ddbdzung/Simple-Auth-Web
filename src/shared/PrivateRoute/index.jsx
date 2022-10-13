import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { access, refresh } = useSelector(store => store.auth)

  if (!access || !refresh) {
    return <Navigate to='/auth/sign-in' />
  }

  return children
}

export default PrivateRoute
