import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

export default AppLayout;

AppLayout.propTypes = {

};

function AppLayout(props) {
  return (
    <div className="min-h-screen bg-slate-500 tablet:bg-orange-300 laptop:bg-green-500">
      <Header />
      <Outlet />
    </div>
  );
}
