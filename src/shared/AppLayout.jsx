import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default AppLayout;

AppLayout.propTypes = {

};

function AppLayout(props) {
  return (
    <div className="bg-slate-300 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
