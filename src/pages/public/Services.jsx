
import { Navbar } from '../../component/layouts/Navbar';
import Footer from '../../component/layouts/Footer';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { services } from '../../constants/services';

export const Services = () => {
    const { user, logout } = useAuth();

    const publicServices = services;

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
                            Our <span className="text-indigo-600">Services</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            We provide a comprehensive suite of travel solutions designed to make your exploration of India unforgettable.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {publicServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-indigo-200 transition-all group"
                            >
                                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};


