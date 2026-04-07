// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { clearAuth } from '../../utils/auth'; 


// const ProfileSidebar = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const { user, setUser } = useAuth();

//   const navButtons = [
//     { label: 'Home', path: user ? '/dashboard' : '/', icon: '🏠' },
//     { label: 'Create Trip', path: '/create-trip', icon: '➕' },
//     { label: 'Join Trip', path: '/join-trip', icon: '🤝' },
//     { label: 'History', path: '/history', icon: '📜' },
//   ];

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

//               {user?.profilePhoto ? (
//                 <img
//                   src={user?.profilePhoto}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full text-5xl bg-indigo-600 text-white flex items-center justify-center">
//                   {user?.fullname?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>
//             <h3 className="text-xl font-black text-slate-900">{user?.fullname}</h3>
//             <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{user?.role}</p>

//             <Link
//               to="/edit-profile"
//               onClick={onClose}
//               className="mt-6 w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
//             >
//               Edit Profile
//             </Link>
//           </div>

//           <div className="px-4 space-y-2">
//             {/* Mobile Navigation Links - Only visible on smaller screens */}
//             <div className="lg:hidden pb-4 mb-4 border-b border-slate-100 space-y-2">
//               <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Navigation</p>
//               {navButtons.map((btn) => (
//                 <Link
//                   key={btn.label}
//                   to={btn.path}
//                   onClick={onClose}
//                   className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
//                 >
//                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform text-lg">
//                     {btn.icon}
//                   </div>
//                   <span className="font-bold text-slate-700">{btn.label}</span>
//                 </Link>
//               ))}
//             </div>

//             <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Personal</p>
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

//             <Link
//               to="/user-reviews"
//               onClick={onClose}
//               className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
//             >
//               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//               <span className="font-bold text-slate-700">My Reviews</span>
//             </Link>
//           </div>
//         </div>

//         <div className="p-8 border-t border-slate-100">
//           <button
//             onClick={() => {
//               clearAuth();
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





import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';


const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!isOpen) return null;


  return (
    <div className="fixed  inset-0 z-[1000] ">
      {/* Backdrop to close the menu */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute right-4 top-16 w-[300px] overflow-hidden max-h-[80vh] overflow-y-auto  bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl shadow-black/40 backdrop-blur-xl"

      >
        {/* User Header */}
        <div className="flex flex-col items-center justify-center py-6 border-b border-[#30363d] bg-gradient-to-b from-indigo-500/10 to-transparent">

          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/30">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white text-xl">
                {user?.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h3 className="text-sm font-semibold text-white">
            {user?.fullname}
          </h3>

          <p className="text-xs text-[#8b949e] capitalize">
            {user?.role}
          </p>

        </div>

        <div className="border-t border-[#30363d] py-3 space-y-1">
          <p className="px-3 mt-2 text-[10px] text-[#8b949e] uppercase tracking-wider">
            Account
          </p>
          <Link
            to="/edit-profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all
             ${location.pathname === "/edit-profile"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-[#c9d1d9] hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:translate-x-1 transition-all duration-200 hover:text-white"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your profile
          </Link>
          <Link
            to="/favourites"
            onClick={onClose}
            className="flex items-center gap-3 px-3 text-[#c9d1d9] py-2 text-sm hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:translate-x-1 transition-all duration-200 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Your favourites
          </Link>
          <Link
            to="/user-reviews"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 text-[#c9d1d9] text-sm hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:translate-x-1 transition-all duration-200 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Your reviews
          </Link>
        </div>

        <div className="border-t border-[#30363d] py-2">
          <p className="px-3 mt-3 text-[10px] text-[#8b949e] uppercase tracking-wider">
            System
          </p>
          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center text-[#c9d1d9] gap-3 px-3 py-2 text-sm hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:translate-x-1 transition-all duration-200 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>

        <div className="border-t border-[#30363d] py-2">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center text-[#c9d1d9] gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:translate-x-1 hover:text-red-300 transition-all duration-200 transition-all text-left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </motion.div>
    </div >
  );
};

export default ProfileSidebar;

