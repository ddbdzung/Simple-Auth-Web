import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { usePathname } from "../../hooks/usePathName"

const tokenEnum = {
  '/auth/recovery': ['defaultPw'],
  '/auth/recovery/code': ['defaultPw', 'clientPw'],
  '/auth/recovery/password': ['defaultPw', 'clientPw', 'secureCodePw'],
}

const ChainResetPassword = ({ children }) => {
  const tokenNames = tokenEnum[usePathname()]
  const authStore = useSelector(store => store.auth)
  const hasToken = tokenNames.every(name => !!authStore[name])
  if (!hasToken) {
    return <Navigate to="/forbidden" replace />
  }

  return children
}

export default ChainResetPassword
