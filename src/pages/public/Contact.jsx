
import { Navbar } from '../../component/layouts/Navbar';
import Footer from '../../component/layouts/Footer';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Contact = () => {
    const [formState, setFormState] = useState('idle');
    const { user,logout } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar user={user} logout={logout} />

            <main className="flex-grow py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                            Get in <span className="text-indigo-600">Touch</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            Have questions about our trips or services? We&apos;re here to help you plan your next big adventure.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-12 rounded-[48px] shadow-xl shadow-slate-200/50 border border-slate-100"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Send us a message</h2>

                            {formState === 'success' ? (
                                <div className="py-20 text-center">
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 font-medium">We&apos;ll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="mt-8 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Subject</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Trip Inquiry"
                                            className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Message</label>
                                        <textarea
                                            required
                                            rows="5"
                                            placeholder="Tell us what's on your mind..."
                                            className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        disabled={formState === 'submitting'}
                                        className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                                    >
                                        {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-indigo-600 p-12 rounded-[48px] text-white shadow-xl shadow-indigo-200">
                                <h3 className="text-2xl font-black mb-8 tracking-tight">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">📍</div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Our Office</p>
                                            <p className="font-bold">123 Explorer Way, New Delhi, India</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">📞</div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Phone Number</p>
                                            <p className="font-bold">+91 98765 43210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">✉️</div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Email Us</p>
                                            <p className="font-bold">hello@incredibleindia.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-lg">
                                <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Follow Our Adventures</h3>
                                <div className="flex gap-4">
                                    {['FB', 'IG', 'TW', 'YT'].map(social => (
                                        <div key={social} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-xs text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer">
                                            {social}
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
