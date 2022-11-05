import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { Navigate, NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import { ERROR, SUCCESS, INFO, API_ENTRY, BASE_DOMAIN } from '../../constants';
import {
  activateAccount,
  clearMessage,
  clearStatusCode,
  logOut,
  sendValidateEmailAsync
} from '../../features/auth/authSlice'
import Alert from '../Alert';

export default Header;

Header.propTypes = {

};

const handleLogOut = (dispatch) => {
  dispatch(logOut())
  return <Navigate to='/auth/sign-in' />
}
const handleSendMail = (dispatch, email) => {
  dispatch(sendValidateEmailAsync(email))
}

function Header(props) {
  const ssEvents = useMemo(() => {
    return new EventSource(`${BASE_DOMAIN}${API_ENTRY}/sse/activate-account`, { withCredentials: true })
  }, [1])
  const defaultLinkStyle = 'border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md'
  const dispatch = useDispatch()
  const { message, username, email, userStatus, statusCode } = useSelector(store => store.auth)
  const [statusMessage, setStatusMessage] = useState(message)
  const [notifType, setNotifType] = useState(ERROR)
  const [notifTitle, setNotifTitle] = useState('error');

  if (userStatus === 'inactive' && ssEvents) {
    ssEvents.addEventListener('error', err => {
      console.log(err)
    })

    ssEvents.addEventListener('activateAccount', msgEvent => {
      if (userStatus === 'inactive') {
        dispatch(activateAccount())
      }
    })
  }

  useEffect(() => {
    if (message) {
      setStatusMessage(message)
    }

    return () => {
      if (message) {
        dispatch(clearMessage())
      }

      if (statusMessage) {
        setTimeout(() => setStatusMessage(''), 3000)
      }
    }
  })

  useEffect(() => {
    if (userStatus && userStatus !== 'inactive') {
      ssEvents.close();
    }

    return () => {
      if (ssEvents) {
        if (ssEvents.readyState === 1 || ssEvents.readyState === 0) {
          ssEvents.close()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (statusCode) {
      if (statusCode === 200 || statusCode === 201) {
        setNotifType(SUCCESS)
        setNotifTitle('success')
        setStatusMessage(message)

      } else if (!statusCode) {
        setNotifType(INFO)
        setNotifTitle('info')
        setStatusMessage('Email already sent. Please check your mailbox')

      } else if (statusCode === 400 || statusCode === 403 || statusCode === 500) {
        setNotifType(ERROR)
        setNotifTitle('error')
        setStatusMessage(message)
      }

      dispatch(clearStatusCode())
    }

  }, [statusCode])

  return (
    <>
      {statusMessage && (
        <div className="absolute top-4 right-4 z-10 max-w-lg bg-transparent">
          <Alert type={notifType} title={notifTitle} contents={statusMessage} id={uuidv4()} />
        </div>
      )}
      <div className="absolute top-4 right-4">
        <span className="text-blue-500">
          Username:
        </span>
        <h2>
          {username}
        </h2>
        <span className="text-blue-500">
          Email:
        </span>
        <h3>
          {email}
        </h3>
        <span className="text-blue-500">
          Status account:
        </span>
        <h3>
          {userStatus}
        </h3>
      </div>

      <ul className="flex flex-row justify-start gap-8 py-4 opacity-80 z-10 fixed top-0 left-0 right-0">
        <li
          className={defaultLinkStyle}>
          <NavLink to="/game">Game page</NavLink>
        </li>
        <li
          className={defaultLinkStyle}>
          <NavLink to="/abc">Not found page</NavLink>
        </li>
        {(userStatus === 'inactive')
          ? <li>
            <button
              onClick={() => handleSendMail(dispatch, email)}
              className="cursor-pointer block w-full basis-16 bg-indigo-600 py-2 px-5 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Activate account
            </button>
          </li>
          : <li>
            <button
              className="cursor-default opacity-70 block w-full basis-16 bg-indigo-600 py-2 px-5 rounded-2xl hover:bg-indigo-700 text-white font-semibold mb-2"
            >
              Activate account
            </button>
          </li>
        }

        <li
          className={defaultLinkStyle}>
          <NavLink to="/test">Test</NavLink>
        </li>
        <li
          className={defaultLinkStyle}>
          <button onClick={() => handleLogOut(dispatch)}>Log out</button>
        </li>
      </ul>
    </>
  );
}
