import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import '../auth.css'

export default AuthenticationLayout;

AuthenticationLayout.propTypes = {

};

function AuthenticationLayout(props) {
  return (
    <>
      <div className="h-screen flex relative">
        <div id="login_img_section" className="hidden lg:flex w-full lg:w-1/2
          justify-around items-center">
          <div className="bg-black opacity-20 inset-0 z-0" />
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
            <p className="text-white mt-1">The simplest app to use</p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">

            {/* Component go here! */}
            <Outlet />

          </div>
        </div>
      </div >
    </>
  );
}
