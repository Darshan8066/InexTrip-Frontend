
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useEffect } from 'react';
import ProfileSidebar from '../../component/ProfileSidebar';
import AdminSidebar from '../../component/admin/AdminSidebar';
import AdminHeader from '../../component/admin/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminStats } from '../../services/adminService';


const AdminDashboard = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [statsData, setStatsData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {
            try {

                const response = await fetchAdminStats();
                setStatsData(response)
                console.log(response)

            } catch (err) {
                console.error("Failed to load admin data", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    const totalRevenue = statsData?.totalRevenue || 0;
    console.log("totalRevenue :", totalRevenue)

    const stats = [
        {
            label: "Total Explorers",
            value: statsData?.totalUsers || 0,
            color: "text-blue-600",
            icon: "👥",
            path: "/admin/users"
        },
        {
            label: "Inventory Size",
            value: statsData?.totalTrips || 0,
            color: "text-orange-600",
            icon: "🧳",
            path: "/admin/trips"
        },
        {
            label: "Total Revenue",
            value: `₹${statsData?.totalRevenue || 0}`,
            color: "text-emerald-600",
            icon: "📈",
            path: "/admin/payments"
        },
        {
            label: "System Health",
            value: "100%",
            color: "text-indigo-600",
            icon: "⚙️",
            path: "/admin"
        }
    ];

    if (loading) {
        return <div style={{ color: "red" }} className="p-10 text-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            {/* Sidebar - TOGGLEABLE */}
            <AdminSidebar isSidebarVisible={isSidebarVisible} />

            {/* Main Content */}
            <main className="flex-grow ">

                {/* Admin HEader */}
                <AdminHeader
                    title="Command Center"
                    subtitle="Live Operational Hub"
                    user={user}
                    onProfileClick={() => setIsProfileOpen(true)}
                    onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
                />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    {/* Stats Cards - CLICKABLE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(stat.path)}
                                className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-indigo-600 hover:-translate-y-1 transition-all group text-left w-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-3xl bg-slate-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Open &rarr;</span>
                                </div>
                                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                <div className={`text-4xl font-black leading-none ${stat.color} tracking-tighter`}>{stat.value}</div>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-8 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
                            <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3 uppercase tracking-widest text-xs">
                                <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                Revenue Performance Flow
                            </h3>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={statsData?.monthlyRevenue}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '10px', fontWeight: 'bold' }} />
                                        <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[48px] border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3 uppercase tracking-widest text-xs">
                                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                                Quick Deploy
                            </h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate('/admin/trips?create=true')}
                                    className="w-full bg-slate-50 hover:bg-slate-100 p-6 rounded-3xl border border-slate-100 transition-all text-left flex items-center justify-between group"
                                >
                                    <span className="font-black uppercase tracking-widest text-[11px] text-slate-700">Add New Inventory</span>
                                    <span className="text-indigo-600 group-hover:translate-x-1 transition-transform text-xl">🚀</span>
                                </button>
                                <button
                                    onClick={() => navigate('/admin/users')}
                                    className="w-full bg-slate-50 hover:bg-slate-100 p-6 rounded-3xl border border-slate-100 transition-all text-left flex items-center justify-between group"
                                >
                                    <span className="font-black uppercase tracking-widest text-[11px] text-slate-700">Explorer Audit Log</span>
                                    <span className="text-orange-600 group-hover:translate-x-1 transition-transform text-xl">📋</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {isProfileOpen && (
                <ProfileSidebar
                    user={user}
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    // onLogout={onLogout}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
