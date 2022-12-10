import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import throttle from 'lodash.throttle'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearMessage,
  resetPasswordAsync,
  clearStatusCode,
} from '../../authSlice'
import Alert from '../../../../shared/Alert'
import { ERROR, SUCCESS } from '../../../../constants'
import { useEffect, useState } from 'react'
import PasswordInput from '../../../../shared/custom/PasswordInput'
import { useNavigate } from 'react-router-dom'

/**
 * Submit form with throttle wait 3s
 */
const throttleWrapper = throttle(async (values, actions, dispatch, secureCodePw) => {
  const { resetPassword } = values
  const token = secureCodePw

  dispatch(resetPasswordAsync({ resetPassword, token }))
}, 3000, { trailing: false })

export default function ResetPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { formStatus, message, secureCodePw, statusCode } = useSelector(store => store.auth)
  const [errorMessage, setErrorMessage] = useState(message)
  const [notifType, setNotifType] = useState(ERROR)
  const [notifTitle, setNotifTitle] = useState('error')

  useEffect(() => {
    if (message) {
      setErrorMessage(message)
    }

    return () => {
      if (message) {
        dispatch(clearMessage())
      }
      if (errorMessage) {
        setTimeout(() => setErrorMessage(''), 3000)
      }
    }
  })

  useEffect(() => {
    if (statusCode) {
      if (statusCode === 200) {
        setNotifType(SUCCESS)
        setNotifTitle('success')
        setErrorMessage(message)

        setTimeout(() => {
          navigate('/auth/sign-in')
        }, 3000)

      }
      dispatch(clearStatusCode())
    }

  }, [statusCode])

  return (
    <>
      {errorMessage && (
        <div className="absolute top-3 left-3 z-10 max-w-lg bg-transparent">
          <Alert type={notifType} title={notifTitle} contents={errorMessage} id={uuidv4()} />
        </div>
      )}
      <Formik
        initialValues={{
          resetPassword: '',
        }}
        validationSchema={Yup.object({
          resetPassword: Yup.string()
            .required('Required')
            .min(8, 'Must not be less than 8 numbers length'),
        })
        }
        onSubmit={(values, actions) => {
          throttleWrapper(values, actions, dispatch, secureCodePw)
        }}
      >
        <Form className="bg-white rounded-md shadow-2xl p-5">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Simple Shop</h1>
          <p className="text-gray-600 uppercase text-md font-semibold">Đặt lại mật khẩu</p>
          <div className="flex flex-col my-4 gap-4">
            <span className="font-medium text-md">
              Hãy sử dụng mật khẩu mạnh với ít nhất 8 kí tự
            </span>
            <div className="flex flex-row justify-start">
              <PasswordInput id="resetPassword" name="resetPassword" className="border-b-2 border-l-2 border-t-2 border-solid rounded-bl-md rounded-tl-md pl-4 py-2 text-lg w-1/2" />
            </div>
          </div>
          {formStatus && formStatus === 'ready'
            ?
            <div className="flex flex-row justify-end">
              <button type="submit" className="block w-full basis-16 bg-indigo-600 mt-5 mx3 py-2 px-5 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                Tiếp tục
              </button>
            </div>
            :
            <div className="flex flex-row justify-end">
              <button disabled type="submit" className="block w-full basis-16 bg-indigo-600 mt-5 mx-3 py-2 px-5 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                <div className="flex flex-row">
                  <span className="mx-2">Đang tải</span>
                  <div className="inline">
                    <svg role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          }
        </Form>
      </Formik>
    </>
  )
}
