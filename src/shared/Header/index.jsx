import PropTypes from 'prop-types';
import { useDispatch } from "react-redux"
import { Navigate, NavLink } from "react-router-dom"

import { logOut } from '../../features/auth/authSlice'

export default Header;

Header.propTypes = {

};

const handleLogOut = (dispatch) => {
  dispatch(logOut())
  return <Navigate to='/auth/sign-in' />
}

function Header(props) {
  const dispatch = useDispatch()

  return (
    <ul className="flex flex-row justify-start gap-8 py-4 opacity-80 z-10 fixed top-0 left-0 right-0">
      <li
        className="border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md">
        <NavLink to="/game">Game page</NavLink>
      </li>
      <li
        className="border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md">
        <NavLink to="/abc">Not found page</NavLink>
      </li>
      <li
        className="border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md">
        <NavLink to="/test">Test</NavLink>
      </li>
      <li
        className="border-4 border-black p-1 bg-yellow-300 text-green-600 text-xl rounded-md">
        <button onClick={() => handleLogOut(dispatch)}>Log out</button>
      </li>
    </ul>
  );
}
