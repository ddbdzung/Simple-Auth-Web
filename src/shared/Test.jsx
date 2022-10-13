import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { clearMessage, testAsync } from '../features/auth/authSlice'
import { useEffect } from "react"

const Test = () => {
  const dispatch = useDispatch()
  const { message } = useSelector(store => store.auth)
  useEffect(() => {
    if (message) {
      alert(message)
      dispatch(clearMessage())
    }

    return () => {
      if (message) {
        dispatch(clearMessage())
      }
    }
  })
  return (
    <button
      className="mt-20 border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md"
      onClick={() => dispatch(testAsync())}>
      Call API
    </button>
  )
}

export default Test
