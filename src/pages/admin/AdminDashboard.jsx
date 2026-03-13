
import React, { useState } from 'react';
// import { apiService } from '../services/apiService';
// import { Trip, User, Payment } from '../types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// import ProfileSidebar from '../components/ProfileSidebar';
import { useEffect } from 'react';
import { fetchUser, fetchUserById } from '../../services/authService';
import { fetchTrip } from '../../services/tripServices';
import { fetchPayment } from '../../services/paymentService';
import ProfileSidebar from '../../component/ProfileSidebar';
import AdminSidebar from '../../component/admin/AdminSidebar';
import { fetchAdminStats } from '../../services/adminService';


const AdminDashboard = ({ onLogout }) => {

    const navigate = useNavigate();

    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [payments, setPayments] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {
            try {

                const [u, t, p, userData] = await Promise.all([
                    fetchUser(),
                    fetchTrip(),
                    fetchPayment(),
                    // fetchAdminStats(),
                    fetchUserById()
                ]);
                console.log("user data : ", u);
                setUsers(u?.user || []);
                setTrips(t?.trip || []);
                setPayments(p?.payments || []);
                // setStatsData(s);
                setUser(userData?.user || null);

            } catch (err) {
                console.error("Failed to load admin data", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    const totalRevenue = statsData?.totalRevenue || 0;

    const chartData = statsData?.monthlyRevenue || [
        { name: "Week 1", revenue: totalRevenue * 0.15 },
        { name: "Week 2", revenue: totalRevenue * 0.25 },
        { name: "Week 3", revenue: totalRevenue * 0.40 },
        { name: "Week 4", revenue: totalRevenue * 1.0 },
    ];

    const stats = [
        {
            label: "Total Explorers",
            value: users?.length || 0,
            color: "text-blue-600",
            icon: "👥",
            path: "/admin/users"
        },
        {
            label: "Inventory Size",
            value: trips?.length || 0,
            color: "text-orange-600",
            icon: "🧳",
            path: "/admin/trips"
        },
        {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
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
        return <div style={{color:"red"}} className="p-10 text-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            {/* Sidebar - TOGGLEABLE */}
            <AdminSidebar isSidebarVisible={isSidebarVisible} />

            {/* Main Content */}
            <main className="flex-grow overflow-x-hidden">
                <header className="bg-white border-b border-slate-200 p-8 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/90">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSidebarVisible(!isSidebarVisible)}
                            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all flex flex-col gap-1 items-center justify-center w-12 h-12"
                        >
                            <span className={`w-6 h-0.5 bg-slate-900 rounded-full transition-all ${!isSidebarVisible ? 'rotate-0' : ''}`} />
                            <span className="w-4 h-0.5 bg-slate-900 rounded-full" />
                            <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Command Center</h1>
                            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-1">Live Operational Hub</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsProfileOpen(true)}
                            className="flex items-center gap-4 bg-slate-50 p-2 pl-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-slate-900 font-black text-xs group-hover:text-indigo-600 transition-colors">{user?.fullname}</p>
                                <p className="text-indigo-600 text-[8px] font-black uppercase tracking-widest">Master Node</p>
                            </div>
                            <img src={user?.profilePhoto} className="w-10 h-10 rounded-xl border-2 border-white shadow-md" alt="Admin" />
                        </button>
                    </div>
                </header>

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
                                    <AreaChart data={chartData}>
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
                    onLogout={onLogout}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
