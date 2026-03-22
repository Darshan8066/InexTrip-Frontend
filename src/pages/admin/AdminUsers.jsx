
import React, { useState } from 'react';
// import { User } from '../types';
// import { apiService } from '../services/apiService';
import { Link, useNavigate, useLocation, data } from 'react-router-dom';
import ProfileSidebar from '../../component/ProfileSidebar';
import { useEffect } from 'react';
import { deleteUserbyId, fetchUser, fetchUserById } from '../../services/authService';
import { fetchauditUser } from '../../services/auditService';
import AdminSidebar from '../../component/admin/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import AdminHeader from '../../component/admin/AdminHeader';

const AdminUsers = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const data = await fetchUser();
            setUsers(data.user);
        } catch (err) {
            console.error("Failed to load users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAudit = async (u) => {
        try {
            const report = await fetchauditUser(u.id, user);
            alert(`MEMBER PROFILE: ${u.fullname}\n\nEmail: ${u.email}\nJoined: ${new Date(u.createdAt).toLocaleDateString('en-GB')}\nTrips Logged: ${report.activityLogs.length}\nAccount Integrity: 100%`);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleDeleteUser = async (id) => {
        if (id === user.id) {
            alert("Error: You cannot delete your own master admin account.");
            return;
        }
        if (!window.confirm("CRITICAL: Permanently remove this explorer and all associated journey logs from the database?")) return;
        try {
            await deleteUserbyId(id, user);
            await fetchUserById();
            alert("Account successfully removed from database.");
        } catch (e) {
            alert(e.message);
        }
    };

    //     return (
    //         <div className="min-h-screen bg-slate-50 flex text-slate-900 transition-all duration-300">

    //             <AdminSidebar isSidebarVisible={isSidebarVisible} />
    //             <main className="flex-grow">
    //                 <AdminHeader
    //                     title="Explorer Registry"
    //                     subtitle={`Total Users: ${users.length}`}
    //                     user={user}
    //                     isSidebarVisible={isSidebarVisible}
    //                     setSidebarVisible={setSidebarVisible}
    //                     setIsProfileOpen={setIsProfileOpen}
    //                 ></AdminHeader>

    //                 <div className="p-8">
    //                     <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
    //                         <table className="w-full text-left">
    //                             <thead className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest">
    //                                 <tr>
    //                                     <th className="px-10 py-6">Member Identity</th>
    //                                     <th className="px-10 py-6 text-right">System Controls</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody className="divide-y divide-slate-100">
    //                                 {users.map(u => (
    //                                     <tr key={u._id} className="text-slate-600 hover:bg-slate-50/50 transition-all group">
    //                                         <td className="px-10 py-6">
    //                                             <div className="flex items-center gap-5">

    //                                                 {user?.profilePhoto ? (
    //                                                     <img
    //                                                         src={user?.profilePhoto}
    //                                                         className="w-full h-full border-2 border-blue-600 rounded-2xl object-cover"
    //                                                     />
    //                                                 ) : (
    //                                                     <div className="w-13 h-13  bg-indigo-600 text-white text-2xl rounded-xl flex items-center justify-center font-bold">
    //                                                         {user?.fullname?.charAt().toUpperCase()}

    //                                                     </div>
    //                                                 )}
    //                                                 <div>
    //                                                     <p className="font-black text-slate-900 text-base tracking-tight leading-none mb-1">{u.fullName}</p>
    //                                                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{u.email}</p>
    //                                                 </div>
    //                                             </div>
    //                                         </td>
    //                                         <td className="px-10 py-6 text-right">
    //                                             <div className="flex justify-end gap-3">
    //                                                 <button
    //                                                     onClick={() => handleAudit(u)}
    //                                                     className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
    //                                                 >
    //                                                     View Profile
    //                                                 </button>
    //                                                 <button
    //                                                     onClick={() => handleDeleteUser(u.id)}
    //                                                     className="bg-rose-50 text-rose-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
    //                                                 >
    //                                                     Delete Account
    //                                                 </button>
    //                                             </div>
    //                                         </td>
    //                                     </tr>
    //                                 ))}
    //                             </tbody>
    //                         </table>
    //                     </div>
    //                 </div>
    //             </main>

    //             {isProfileOpen && (
    //                 <ProfileSidebar
    //                     user={user}
    //                     isOpen={isProfileOpen}
    //                     onClose={() => setIsProfileOpen(false)}
    //                     onLogout={onLogout}
    //                 />
    //             )}
    //         </div>
    //     );
    // };

    return (
        <div className="h-screen bg-slate-50 flex text-slate-900 transition-all duration-300 overflow-hidden">

            {/* Sidebar - TOGGLEABLE */}
            <AdminSidebar isSidebarVisible={isSidebarVisible} />

            <main className="flex-grow h-full overflow-y-auto overflow-x-hidden transition-all duration-300 scroll-smooth">

                {/* Admin HEader */}
                <AdminHeader
                    title="Command Center"
                    subtitle="Live Operational Hub"
                    user={user}
                    onProfileClick={() => setIsProfileOpen(true)}
                    onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
                />

                <div className="p-8">
                    <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="px-10 py-6">Member Identity</th>
                                    <th className="px-10 py-6 text-right">System Controls</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map(u => (
                                    <tr key={u.id} className="text-slate-600 hover:bg-slate-50/50 transition-all group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-5">
                                                <img src={u.profilePhoto} className="w-14 h-14 rounded-2xl border-2 border-white shadow-md object-cover" alt="" />
                                                <div>
                                                    <p className="font-black text-slate-900 text-base tracking-tight leading-none mb-1">{u.fullname}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => handleAudit(u)}
                                                    className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    View Profile
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="bg-rose-50 text-rose-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    Delete Account
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {isProfileOpen && (
                <ProfileSidebar
                    user={user}
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    onLogout={onLogout}
                />
            )}
        </div>
    );
};

export default AdminUsers;
