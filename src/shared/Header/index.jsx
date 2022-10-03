import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default Header;

Header.propTypes = {

};


function Header(props) {

  return (
    <ul className="flex flex-row justify-start gap-8 py-4 opacity-80 z-10 fixed top-0 left-0 right-0">
      <li
        className="border-4 border-black bg-yellow-300 text-green-600 text-xl rounded-md">
        <NavLink to="/game">Game page</NavLink>
      </li>
      <li
        className="border-4 border-black bg-yellow-300 text-green-600 text-xl rounded-md">
        <NavLink to="/abc">Not found page</NavLink>
      </li>
    </ul>
  );
}
