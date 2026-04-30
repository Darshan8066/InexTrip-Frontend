
import { useState } from 'react';
import Footer from '../../component/layouts/Footer';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteUserbyId, updateUser } from '../../services/authService';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const Settings = () => {

    const { user, logout, setUser } = useAuth();
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [mobileData, setMobileData] = useState({
        newMobile: user?.mobile || ''
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });

            toast.error("Passwords do not match ❌");

            return;
        }
        // if (passwordData.currentPassword !== passwordData.newPassword) {
        //     setMessage({ type: 'error', text: 'Your new password cannot be same as old password.' });

        //     toast.error("Your new password cannot be same as old password. ❌");

        //     return;
        // }

        try {
            await updateUser({
                password: passwordData.newPassword,
                currentPassword: passwordData.currentPassword
            });

            setMessage({ type: 'success', text: 'Password updated successfully!' });

            toast.success("Password updated successfully 🔒");

            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

        } catch (err) {
            setMessage({ type: 'error', text: err.message });

            toast.error(err.message || "Something went wrong ❌");
        }
    };

    const handleMobileChange = async (e) => {
        e.preventDefault();

        try {
            await updateUser({ mobile: mobileData.newMobile });

            // ✅ update UI instantly
            setUser(prev => ({
                ...prev,
                mobile: mobileData.newMobile
            }));
            toast.success("Mobile updated successfully 📱");
        } catch (err) {
            toast.error(err.message || "Something went wrong ❌");
        }
    };
    const handleDeleteAccount = async () => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        setIsDeleting(true);

        try {
            await deleteUserbyId(user._id);

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your account has been deleted.',
                timer: 2000,
                showConfirmButton: false
            });

            logout();
            navigate('/');

        } catch (err) {
            setMessage({ type: 'error', text: err.message });

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'Failed to delete account',
            });

            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">

            <main className="flex-grow py-12 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Account Settings</h1>
                        <p className="text-slate-500 font-medium">Manage your security, contact information, and account status.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: User Details Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 lg:sticky lg:top-24">
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className="w-24 h-24 rounded-[28px] overflow-hidden border-4 border-slate-50 shadow-inner mb-4">
                                        {/* <img
                                            src={user?.profilePhoto || 'https://picsum.photos/seed/user/200'}
                                            className="w-full h-full object-cover"
                                            alt="Profile"
                                            referrerPolicy="no-referrer"
                                        /> */}
                                        {user?.profilePhoto ? (
                                            <img
                                                src={user?.profilePhoto}
                                                className=" w-33 h-32 border-3 border-black rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full text-6xl rounded-full border-3 border-black bg-indigo-600 text-white flex items-center justify-center font-bold">
                                                {user?.fullname?.charAt().toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-black text-slate-900 leading-tight">{user?.fullname}</h2>
                                    <span className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                                        {user?.role}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                        <p className="text-sm font-bold text-slate-700 break-all">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile Number</p>
                                        <p className="text-sm font-bold text-slate-700">{user?.mobile || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account ID</p>
                                        <p className="text-[12px] font-mono text-slate-400 bg-slate-50 p-2 rounded-lg">{user?._id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Forms */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Change Password */}
                            <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-xl">🔒</div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Security</h2>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Update your password</p>
                                    </div>
                                </div>

                                <form onSubmit={handlePasswordChange} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Current Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-2xl outline-none transition-all font-bold text-slate-700 shadow-sm"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">New Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-2xl outline-none transition-all font-bold text-slate-700 shadow-sm"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-2xl outline-none transition-all font-bold text-slate-700 shadow-sm"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-100">
                                        Update Password
                                    </button>
                                </form>
                            </section>

                            {/* Change Mobile */}
                            <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">📱</div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Contact Info</h2>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Update your mobile number</p>
                                    </div>
                                </div>

                                <form onSubmit={handleMobileChange} className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Mobile Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={mobileData.newMobile}
                                            onChange={(e) => setMobileData({ ...mobileData, newMobile: e.target.value })}
                                            className="w-full px-6 py-4 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-2xl outline-none transition-all font-bold text-slate-700 shadow-sm"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <button type="submit" className="w-full md:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                                        Update Mobile
                                    </button>
                                </form>
                            </section>

                            {/* Danger Zone */}
                            <section className="bg-rose-50 rounded-[32px] p-8 border border-rose-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 text-xl">⚠️</div>
                                    <div>
                                        <h2 className="text-xl font-black text-rose-900 tracking-tight">Danger Zone</h2>
                                        <p className="text-xs text-rose-400 font-bold uppercase tracking-widest">Irreversible actions</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-2xl border border-rose-200">
                                    <div>
                                        <p className="font-bold text-slate-800">Delete Account</p>
                                        <p className="text-sm text-slate-500">Permanently remove your account and all associated data.</p>
                                    </div>
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                        className="w-full md:w-auto px-8 py-3 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-rose-200 disabled:opacity-50"
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {user?.role !== "ADMIN" && <Footer />}
        </div>
    );
};


