
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import { useAuth } from '../context/AuthContext';


const Navbar = ({ onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const user = getUser();
  const { user } = useAuth();


  const navButtons = [
    { label: 'Home', path: user ? '/user/dashboard' : '/' },
    { label: 'Create Trip', path: '/create-trip' },
    { label: 'Join Trip', path: '/join-trip' },
      
    { label: 'History', path: '/history' },
  ];

  return (
    <>
      <nav className=" top-0 z-[100] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 border-b border-white/10 px-4 py-3 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">

          {/* Profile on the Left */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate('/user/dashboard')}
                className="w-13 h-13 items-center  px-3 py-1 "
              >
                <div className="w-13 h-13 rounded-full overflow-hidden">

                  {/* <img src={user.profilePhoto} className="w-full h-full object-cover" alt={user.fullName} /> */}

                  {user.profilePhoto ? (
                    <img
                      src={user?.profilePhoto}
                      className="w-full h-full border-2 border-blue-600 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {user?.fullname?.charAt().toUpperCase()}

                    </div>
                  )}

                </div>

              </button>
            ) : (
              <div
                onClick={() => navigate("/")}
                className="w-13 h-13 bg-purple-800 backdrop-blur-md rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">T</div>
            )}
          </div>

          {/* Navigation Buttons in the Center */}

          <div className="hidden lg:flex items-center space-x-4">
            {navButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                className={`px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] border border-white/20 uppercase tracking-widest ${location.pathname === btn.path
                  ? ' hover:bg-blue-700 translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
                  : 'px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] border border-white/20 uppercase tracking-widest hover:bg-blue-700 translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'

                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 bg-indigo-800 text-white rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] border border-black/10 hover:bg-indigo-900 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={() => navigate('/login')} className="px-7 py-3 bg-indigo-900 text-white rounded-3xl font-bold text-sm  border border-indigo-900">Login</button>
                <button onClick={() => navigate('/register')} className="px-7 py-3  bg-white  text-indigo-600 rounded-3xl font-bold text-sm" >Register</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {user && (
        <ProfileSidebar
          user={user}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={onLogout}
        />
      )}
    </>
  );
};

export default Navbar;
