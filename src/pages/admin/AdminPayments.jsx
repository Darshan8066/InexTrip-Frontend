
import React, { useState, useEffect } from 'react';


import ProfileSidebar from '../../component/ProfileSidebar';
import AdminSidebar from '../../component/admin/AdminSidebar';
import { fetchPayment, fetchPaymentByUserId } from '../../services/paymentService';
import { fetchUserById } from '../../services/authService';
import AdminHeader from '../../component/admin/AdminHeader';
import { useAuth } from '../../context/AuthContext';

const AdminPayments = ({ onLogout }) => {

    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const { user } = useAuth();


    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchPayment();
                console.log("fetchPayment", res.payments);
                setPayments(res.payments);
            } catch (err) {
                console.error("Failed to load ledger data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // const handleExportData = async () => {
    //     try {
    //         const data = await fetchPaymentByUserId();
    //         const blob = new Blob([data], { type: 'application/json' });
    //         const url = URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = `TripPlanner_Ledger_Node_${Date.now()}.json`;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(url);
    //         alert("Financial Ledger Node data exported successfully.");
    //     } catch (err) {
    //         alert(err.message);
    //     }
    // };

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            {/* Sidebar - TOGGLEABLE */}
            <AdminSidebar isSidebarVisible={isSidebarVisible} />

            <main className="flex-grow">
                <AdminHeader
                    title="Finance Ledger"
                    subtitle={`Total Transaction : ${payments.length}`}
                    user={user}
                    onProfileClick={() => setIsProfileOpen(true)}
                    onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
                />

                <div className="p-8">
                    {payments.length === 0 ? (
                        <div className="bg-white rounded-[40px] p-24 text-center border border-slate-200 shadow-sm">
                            <span className="text-7xl block mb-6 opacity-10">💸</span>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Registry Silent</h2>
                            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">No transaction signals detected in current epoch</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-6">Protocol Hash</th>
                                        <th className="px-8 py-6">Source Node</th>
                                        <th className="px-8 py-6">Volume</th>
                                        <th className="px-8 py-6">Timestamp</th>
                                        <th className="px-8 py-6 text-right">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {payments?.map(p => {
                                        return (
                                            <tr key={p._id} className="text-slate-600 hover:bg-slate-50 transition-colors group">
                                                <td className="px-8 py-6 font-mono text-[10px] text-indigo-600 font-black">#{p.transactionId}</td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <img src={p?.userId.profilePhoto} className="w-8 h-8 rounded-lg border border-slate-100 shadow-sm" alt="" />
                                                        <div>
                                                            <span className="block font-black text-xs text-slate-900">{p?.userId.fullname || 'Anonymous Node'}</span>
                                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.paymentMethod}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-black text-slate-900 text-lg tracking-tight">₹{p.amount.toLocaleString()}</td>
                                                <td className="px-8 py-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(p.date).toLocaleString()}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[8px] font-black uppercase tracking-widest">Verified</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
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

export default AdminPayments;
