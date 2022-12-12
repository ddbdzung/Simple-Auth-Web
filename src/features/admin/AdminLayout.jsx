import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import { Outlet, useLocation } from 'react-router-dom';

import './css/style.css';
import Alert from '../../shared/Alert';
import { clearMessage } from './adminSlice';
import { INFO } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';

function AdminLayout() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { message } = useSelector(store => store.admin)
  const [errorMessage, setErrorMessage] = useState(message)

  useEffect(() => {
    if (message) {
      setErrorMessage(prev => {
        return message
      })
    }

    return () => {
      if (message) {
        dispatch(clearMessage())
        setErrorMessage('')
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
        <div className="absolute top-16 right-16 z-10 max-w-lg bg-transparent">
          <Alert type={INFO} title='Info' contents={errorMessage} id={uuidv4()} />
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
