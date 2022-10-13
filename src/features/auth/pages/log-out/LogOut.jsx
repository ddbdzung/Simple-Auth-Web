import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import { logOut } from '../../authSlice'

const LogOut = () => {
  const dispatch = useDispatch()
  dispatch(logOut())

  return <Navigate to='/auth/sign-in' />
}

export default LogOut
