import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import { logOutAsync } from '../../authSlice'

const LogOut = () => {
  const dispatch = useDispatch()
  dispatch(logOutAsync())

  return <Navigate to='/auth/sign-in' />
}

export default LogOut
