import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const sidebarLinks = [
    { path: '/admin/dashboard', label: 'Overview', icon: '⚡' },
    { path: '/admin/users', label: 'Explorers', icon: '👥' },
    { path: '/admin/trips', label: 'Inventory', icon: '🗺️' },
    { path: '/admin/payments', label: 'Ledger', icon: '💰' },
    { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
];
export default function AdminSidebar({ onLogout, isSidebarVisible }) {
    const navigate = useNavigate();
    const location = useLocation();


    return (
        <div>

            <aside className={`border-r border-slate-200 flex flex-col bg-white h-screen sticky top-0 shadow-sm z-50 transition-all duration-300 overflow-hidden ${isSidebarVisible ? 'w-72 opacity-100' : 'w-0 opacity-0 px-0 border-none'}`}>
                <div className="p-8 mb-4 min-w-[288px]">
                    <Link to="/admin" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">A</div>
                        <div>
                            <span className="block text-lg font-black text-slate-900 tracking-tight leading-none">CORE</span>
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Administrator</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-grow px-6 space-y-2 min-w-[288px]">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center space-x-3 p-4 rounded-2xl font-bold transition-all group ${location.pathname === link.path
                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'
                                : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
                                }`}
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                            <span className="uppercase text-[11px] tracking-widest">{link.label}</span>
                        </Link>
                    ))}

                    <div className="pt-8 mt-8 border-t border-slate-100">
                        <Link to="/dashboard" className="flex items-center space-x-3 p-4 rounded-2xl font-bold text-emerald-600 hover:bg-emerald-50 transition-all uppercase text-[10px] tracking-widest">
                            <span>🔙 Return to App</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-6 mt-auto min-w-[288px]">
                    <button
                        onClick={() => { onLogout(); navigate('/'); }}
                        className="w-full py-4 text-rose-600 border-2 border-rose-50 rounded-2xl font-black hover:bg-rose-600 hover:text-white transition-all uppercase tracking-widest text-[10px]"
                    >
                        Log Out
                    </button>
                </div>
            </aside>
        </div>
    )
}
