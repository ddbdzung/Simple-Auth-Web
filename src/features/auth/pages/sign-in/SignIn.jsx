import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import throttle from 'lodash.throttle'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'


import TextInput from '../../../../shared/custom/TextInput'
import { Link } from 'react-router-dom'
import {
  clearMessage,
  signInAsync,
  clearResetPasswordEntry,
} from '../../authSlice'
import { ERROR } from '../../../../constants'
import { useState, useEffect } from 'react'
import Alert from '../../../../shared/Alert'

/**
 * Submit form with throttle wait 3s
 */
const throttleWrapper = throttle(async (values, actions, dispatch) => {
  const { email, password } = values
  const payload = {
    email,
    password
  }
  dispatch(signInAsync(payload))
}, 3000, { trailing: false })

export default function SignIn() {
  const dispatch = useDispatch()
  const { formStatus, message, hasResetPassword } = useSelector(store => store.auth)
  const [errorMessage, setErrorMessage] = useState(message)

  // Component did mount
  useEffect(() => {
    if (hasResetPassword) {
      dispatch(clearResetPasswordEntry())
    }
  }, [])

  useEffect(() => {
    if (message) {
      setErrorMessage(prev => {
        return message
      })
    }

    return () => {
      if (message) {
        dispatch(clearMessage())
      }
    }
  })
  return (
    <>
      {errorMessage && (
        <div className="absolute top-3 left-3 z-10 max-w-lg bg-transparent">
          <Alert type={ERROR} title='Error' contents={errorMessage} id={uuidv4()} />
        </div>
      )}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Required'),
          password: Yup.string()
            .required('Required')
        })
        }
        onSubmit={(values, actions) => {
          throttleWrapper(values, actions, dispatch)
        }}
      >
        <Form className="bg-white rounded-md shadow-2xl p-5">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Simple App</h1>
          <p className="text-sm font-normal text-gray-600 mb-8 uppercase">Sign In</p>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <TextInput id="email" type="email" name="email" placeholder="Email Address" />
          </div>
          <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <TextInput type="password" name="password" id="password" placeholder="Password" />

          </div>
          {formStatus && formStatus === 'ready'
            ?
            <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              Sign In
            </button>
            :
            <button disabled type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              <span className="mx-2">Loading</span>
              <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
            </button>
          }
          <div className="flex justify-between mt-4">
            <Link to="/auth/identify" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>
            <span ></span>

            <Link to="/auth/sign-up" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</Link>
          </div>
        </Form>
      </Formik>
    </>
  )
}
