
import { Navbar } from "../../component/layouts/Navbar";
import Footer from "../../component/layouts/Footer"
import { motion } from 'motion/react';
import { useAuth } from "../../context/AuthContext";

const About = () => {

    const { user,logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar user={user} logout={logout} />

            <main className="flex-grow py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter">
                            About <span className="text-indigo-600">Us</span>
                        </h1>
                        <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                            We are a passionate team of explorers and technology enthusiasts dedicated to helping people discover the incredible beauty of India. Our goal is to make travel simple, personalized, and truly unforgettable through smart technology.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2071"
                                alt="Taj Mahal"
                                className="w-full h-[600px] object-cover rounded-[64px] shadow-2xl"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600 rounded-[48px] p-10 text-white flex flex-col justify-center shadow-2xl">
                                <span className="text-5xl font-black mb-2">10k+</span>
                                <span className="text-sm font-black uppercase tracking-widest opacity-80">Happy Travelers</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-10"
                        >
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Our Mission</h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                    Our mission is to make travel across India easy, personalized, and accessible for everyone. We aim to create unique travel experiences that match each traveler’s interests, preferences, and dreams.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Our Vision</h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                    Our vision is to combine technology and human insight to build seamless, meaningful, and sustainable travel experiences that connect people, cultures, and places.
                                </p>
                            </div>
                            <div className="pt-10">
                                <button className="px-12 py-5 bg-indigo-600 text-white rounded-[32px] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm">
                                    Join Our Journey
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-slate-50 rounded-[64px] p-12 md:p-24 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="text-4xl">🌟</div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Expert Curation</h3>
                                <p className="text-slate-500 font-medium">Every trip is carefully crafted and verified by experienced local travel experts to ensure quality and authenticity.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl">🤖</div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">AI-Powered</h3>
                                <p className="text-slate-500 font-medium">Our intelligent AI personalizes your journey based on your interests, preferences, and travel style.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl">🌍</div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Local Impact</h3>
                                <p className="text-slate-500 font-medium">We collaborate with local communities to promote responsible, sustainable, and meaningful travel experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
