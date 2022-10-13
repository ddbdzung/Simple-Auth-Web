import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
  const { access, refresh } = useSelector(store => store.auth)

  if (access && refresh) {
    return <Navigate to='/' />
  }

  return children
}

export default PublicRoute
