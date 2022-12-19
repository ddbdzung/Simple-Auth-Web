import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import { Outlet, useLocation } from 'react-router-dom';

import './css/style.css';
import Alert from '../../shared/Alert';
import { clearMessage } from './adminSlice';
import { SUCCESS, ERROR } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';

function AdminLayout() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { message } = useSelector(store => store.admin)
  const [errorMessage, setErrorMessage] = useState(message)

  useEffect(() => {
    if (message) {
      setErrorMessage(message)
    }

    return () => {
      if (message) {
        setTimeout(() => { setErrorMessage('') }, 1500)
        dispatch(clearMessage())
      }
    }
  })

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="body_admin" className="font-inter antialiased bg-slate-100 text-slate-600 relative">
      {errorMessage && (
        <div className="absolute top-3 left-3 z-50 max-w-lg bg-transparent">
          <Alert type={(errorMessage === 'OK' || errorMessage === 'Cập nhật thành công') ? SUCCESS : ERROR} title={(errorMessage === 'OK' || errorMessage === 'Cập nhật thành công') ? 'SUCCESS' : 'ERROR'} contents={errorMessage} id={uuidv4()} />
        </div>
      )}

      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              <Outlet />

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
