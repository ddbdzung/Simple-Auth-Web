import { useEffect, useState } from 'react';

import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import { Outlet, useLocation } from 'react-router-dom';

import './css/style.css';

function AdminLayout() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="body_admin" className="font-inter antialiased bg-slate-100 text-slate-600">
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
