
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import { MobileSidebar } from './MobileSidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user,logout } = useAuth();

  const navButtons = user ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Create Trip', path: '/create-trip' },
    { label: 'Join Trip', path: '/join-trip' },
    { label: 'History', path: '/history' },
  ] : [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-indigo-500 border-b border-indigo-400 px-4 py-3 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Profile & Name on the Left */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
            >
              <Menu size={24} />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">T</div>
                <span className="text-sm font-black text-white tracking-tighter uppercase">Trip Planner</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">T</div>
                <span className="text-sm font-black text-white tracking-tighter uppercase">Trip Planner</span>
              </div>
            )}
          </div>

          {/* Navigation Buttons in the Center */}
          <div className="hidden lg:flex items-center space-x-4">
            {navButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                className={`px-6 py-2.5 rounded-2xl font-black text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] border border-black/10 uppercase tracking-widest ${location.pathname === btn.path
                  ? 'bg-indigo-800 text-white translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-white/70 shadow-md shadow-purple-500/30 overflow-hidden bg-white">
                    <img src={user?.profilePhoto} className="w-full h-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
                  </div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white/70 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg> */}
                </button>

                <ProfileSidebar
                  user={user}
                  isOpen={isSidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                  logout={logout}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={() => navigate('/login')} className="px-5 py-2 bg-white rounded-xl font-bold text-xs shadow-sm text-indigo-600 border border-indigo-100">Login</button>
                <button onClick={() => navigate('/register')} className="px-5 py-2 bg-indigo-900 text-white rounded-xl font-bold text-xs shadow-lg">Register</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileSidebar
        user={user}
        isOpen={isMobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        logout={logout}
      />
    </>
  );
};

