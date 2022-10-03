import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import throttle from 'lodash.throttle'

import TextInput from '../../../../shared/custom/TextInput'
import { Link } from 'react-router-dom'

/**
 * Submit form with throttle wait 3s
 */
const throttleWrapper = throttle((values, actions) => {
  // eslint-disable-next-line no-alert
  alert(`${JSON.stringify(values, null, 2)}`)
  actions.setSubmitting(false)
}, 3000, { trailing: false })

export default function SignIn() {
  return (
    <>
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
          throttleWrapper(values, actions)
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
          <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Sign In</button>
          <div className="flex justify-between mt-4">
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>

            <Link to="/auth/sign-up" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</Link>
          </div>
        </Form>
      </Formik>
    </>
  )
}
