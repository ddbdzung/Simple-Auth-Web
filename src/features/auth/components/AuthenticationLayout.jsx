import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import '../auth.css'

export default AuthenticationLayout;

AuthenticationLayout.propTypes = {

};

function AuthenticationLayout(props) {
  return (
    <>
      <div className="h-screen flex relative">
        <div id="login_img_section" className="hidden tablet:flex w-full tablet:w-1/2
          justify-around items-center">
          <div className="bg-black opacity-20 inset-0 z-0" />
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Simple Shop</h1>
            <p className="text-white mt-1">Shop bán điện thoại đơn giản</p>
            <div className="flex justify-center tablet:justify-start mt-6">
              <NavLink to="/" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
                Trang chủ
              </NavLink>
            </div>
          </div>
        </div>
        <div className="relative flex w-full tablet:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="absolute top-12 right-12 tablet:hidden">
            <NavLink to="/" className="block p-2 rounded-md text-white bg-black hover:bg-slate-700 active:bg-slate-500">Trang chủ</NavLink>
          </div>
          <div className="w-full px-8 md:px-32 tablet:px-24">

            <Outlet />

          </div>
        </div>
      </div >
    </>
  );
}
