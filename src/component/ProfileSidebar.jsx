
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { clearAuth } from '../utils/auth';
// import { useAuth } from '../context/AuthContext';
// // import { storageService } from '../services/storageService';



// const ProfileSidebar = ({ user, isOpen, onClose, }) => {
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[1000] overflow-hidden">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in-right flex flex-col">
//         <div className="p-8 border-b border-slate-100 flex items-center justify-between">
//           <h2 className="text-xl font-black text-slate-900">Account</h2>
//           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="flex-grow overflow-y-auto py-8">
//           <div className="flex flex-col items-center px-8 mb-10">
//             <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-indigo-50 shadow-xl mb-4">
//               {/* <img src={user.profilePhoto} className="w-full h-full object-cover" alt={user.fullName} /> */}

//               {user.profilePhoto ? (
//                 <img
//                   src={user.profilePhoto}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full text-5xl bg-indigo-600 text-white flex items-center justify-center">
//                   {user.fullname.charAt(0).toUpperCase()}
//                 </div>
//               )}

//             </div>
//             <h3 className="text-xl font-black text-slate-900">{user.fullName}</h3>
//             <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{user.role}</p>

//             <Link
//               to="/edit-profile"
//               onClick={onClose}
//               className="mt-6 w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
//             >
//               Edit Profile
//             </Link>
//           </div>

//           <div className="px-4 space-y-2">
//             <Link
//               to="/favourites"
//               onClick={onClose}
//               className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
//             >
//               <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <span className="font-bold text-slate-700">My Favourites</span>
//             </Link>

//             <button
//               onClick={() => { localStorage.clearCache(); onClose(); }}
//               className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group text-left"
//             >
//               <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <span className="font-bold text-slate-700">Clear Cache</span>
//             </button>
//           </div>
//         </div>

//         <div className="p-8 border-t border-slate-100">
//           <button
//             onClick={() => {
//               clearAuth()
//               navigate("/");
//               setUser(null);
//             }}
//             className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black hover:bg-rose-100 transition-all border border-rose-100"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
//             </svg>
//             Log Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clearAuth } from '../utils/auth';
import { clearHistory } from '../services/historyService';





const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const navButtons = [
    { label: 'Home', path: user ? '/dashboard' : '/', icon: '🏠' },
    { label: 'Create Trip', path: '/create-trip', icon: '➕' },
    { label: 'Join Trip', path: '/join-trip', icon: '🤝' },
    { label: 'History', path: '/history', icon: '📜' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in-right flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">Account</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto py-8">
          <div className="flex flex-col items-center px-8 mb-10">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-indigo-50 shadow-xl mb-4">
              {/* <img src={user.profilePhoto} className="w-full h-full object-cover" alt={user.fullName} /> */}

              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full text-5xl bg-indigo-600 text-white flex items-center justify-center">
                  {user.fullname.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-900">{user.fullName}</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{user.role}</p>

            <Link
              to="/edit-profile"
              onClick={onClose}
              className="mt-6 w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Edit Profile
            </Link>
          </div>

          <div className="px-4 space-y-2">
            {/* Mobile Navigation Links - Only visible on smaller screens */}
            <div className="lg:hidden pb-4 mb-4 border-b border-slate-100 space-y-2">
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Navigation</p>
              {navButtons.map((btn) => (
                <Link
                  key={btn.label}
                  to={btn.path}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform text-lg">
                    {btn.icon}
                  </div>
                  <span className="font-bold text-slate-700">{btn.label}</span>
                </Link>
              ))}
            </div>

            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Personal</p>
            <Link
              to="/favourites"
              onClick={onClose}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold text-slate-700">My Favourites</span>
            </Link>

            <Link
              to="/user-reviews"
              onClick={onClose}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="font-bold text-slate-700">My Reviews</span>
            </Link>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100">
          <button
            onClick={() => {
              clearAuth();
              navigate("/");
              setUser(null);
            }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black hover:bg-rose-100 transition-all border border-rose-100"
          >

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

