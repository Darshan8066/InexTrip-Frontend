import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import { storageService } from '../../services/storageService';
import { fetchTripById } from '../../services/tripServices';
import { useAuth } from '../../context/AuthContext';

const TripType = {
    AI: "AI",
    JOIN: "JOIN"
};

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const { user } = useAuth();
    const [numPersons, setNumPersons] = useState(1);
    const [showGallery, setShowGallery] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const allTrips = async () => {
        const res = await fetchTripById(id);
        console.log("TripDetails : ", res.trip)
        setTrip(res.trip)
    }

    useEffect(() => {
        allTrips();
    }, [id])


    const handleConfirmAction = () => {
        if (!user) {
            alert("Please login to proceed with booking.");
            navigate('/login');
            return;
        }

        if (!trip) return;

        if (trip.tripType === TripType.AI) {
            storageService.saveHistory({
                id: `hist-${Date.now()}`,
                userId: user.id,
                tripId: trip.id,
                type: 'CREATED',
                date: Date.now()
            });

            alert("Itinerary saved to your Created Trips!");
            navigate('/history');
        } else {
            navigate(`/payment/${trip._id}?persons=${numPersons}`);
            // admin/payments
        }
    };

    if (!trip) {
        return (
            <div className="p-10 text-center font-bold text-slate-400">
                Loading trip details...
            </div>
        );
    }

    const totalPrice = trip.price * numPersons;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar user={user} onLogout={() => { }} />

            <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">


                <section className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 px-4">
                        <div>
                            <h1 className="text-6xl font-black text-slate-900 mb-2 tracking-tight">
                                {trip.to}
                            </h1>
                            <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">
                                {trip.description?.split('.')[0] || 'Explore the world'}
                            </p>
                        </div>

                        <div className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg">
                            {trip.dayPlan.length} DAY ADVENTURE
                        </div>
                    </div>

                    {/* Image Layout */}
                    <div className="grid md:grid-cols-2 gap-4 h-[450px]">

                        {/* LEFT BIG IMAGE */}
                        <div className="rounded-3xl overflow-hidden">
                            <img
                                src={trip.images[0]}
                                alt={trip.to}
                                className="w-full h-full max-h-[468px] object-cover rounded-3xl"
                            />
                        </div>

                        {/* RIGHT GRID */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                            {trip.images.slice(1, 5).map((img, i) => (
                                <div key={i} className="relative rounded-3xl overflow-hidden">

                                    <img
                                        src={img}
                                        className="w-full h-full object-cover"
                                        alt="trip"
                                    />
                                    {/* Show All Photos Button */}
                                    {i === 3 && (
                                        <button
                                            onClick={() => {
                                                setActiveImage(0);
                                                setShowGallery(true);
                                            }}
                                            className="absolute text-xs bottom-2 right-2 bg-black backdrop-blur px-4 py-2 rounded-lg"
                                        >
                                            Show All Photos
                                        </button>
                                    )}

                                </div>
                            ))}
                        </div>

                    </div>
                </section>
                {showGallery && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-6 right-8 text-white text-4xl"
                        >
                            ✕
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={() =>
                                setActiveImage((prev) =>
                                    prev === 0 ? trip.images.length - 1 : prev - 1
                                )
                            }
                            className="absolute left-6 text-white text-5xl"
                        >
                            ‹
                        </button>

                        {/* Image */}
                        <img
                            src={trip.images[activeImage]}
                            alt="gallery"
                            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
                        />

                        {/* Next Button */}
                        <button
                            onClick={() =>
                                setActiveImage((prev) =>
                                    prev === trip.images.length - 1 ? 0 : prev + 1
                                )
                            }
                            className="absolute right-6 text-white text-5xl"
                        >
                            ›
                        </button>

                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
                                <span className="w-2 h-10 bg-indigo-600 rounded-full" />
                                COMPLETE ITINERARY ({trip.dayPlan.length} DAYS)
                            </h2>
                            <div className="space-y-16">
                                {trip.dayPlan.map((day, idx) => (
                                    <div key={idx} className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-xl hover:shadow-2xl transition-all relative">
                                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl">
                                            {day.day}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Day {day.day} Activities</h3>
                                                <ul className="space-y-4">
                                                    {day.activities.map((act, i) => (
                                                        <li key={i} className="flex items-start gap-4 text-slate-600 font-bold text-lg">
                                                            <span className="w-3 h-3 rounded-full bg-indigo-600 mt-2.5 shrink-0" />
                                                            {act}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-4">
                                                    <div className="px-4 py-2 bg-indigo-50 rounded-2xl text-xs font-black text-indigo-600 uppercase">☕ Breakfast: {day.meals.breakfast}</div>
                                                    <div className="px-4 py-2 bg-indigo-50 rounded-2xl text-xs font-black text-indigo-600 uppercase">🍲 Lunch: {day.meals.lunch}</div>
                                                    <div className="px-4 py-2 bg-indigo-50 rounded-2xl text-xs font-black text-indigo-600 uppercase">🌃 Dinner: {day.meals.dinner}</div>
                                                </div>
                                            </div>
                                            <div className="h-80 rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50">
                                                <img src={day.image} className="w-full h-full object-cover" alt={`Day ${day.day}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="md:col-span-1">
                        <div className="sticky top-2">
                            <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-2xl text-center">
                                <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">Final Package Value</p>
                                <div className="text-6xl font-black text-slate-900 mb-12 leading-none tracking-tighter">₹{totalPrice.toLocaleString()}</div>

                                {trip.tripType === TripType.JOIN && (
                                    <div className="mb-12 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Group Size (Persons)</label>
                                        <div className="flex items-center justify-center gap-8">
                                            <button
                                                onClick={() => setNumPersons(Math.max(1, numPersons - 1))}
                                                className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-black text-2xl hover:border-indigo-600 transition-all shadow-sm"
                                            >-</button>
                                            <span className="text-4xl font-black w-12 text-slate-900">{numPersons}</span>
                                            <button
                                                onClick={() => setNumPersons(numPersons + 1)}
                                                className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                                            >+</button>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-slate-50 p-8 rounded-[32px] space-y-6 mb-12 text-left border border-slate-100">
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Route</span>
                                        <span className="text-slate-900 ml-5 font-black text-lg">{trip.from} &rarr; {trip.to}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Transport</span>
                                        <span className="text-slate-900 font-black text-lg">{trip.transportMode}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmAction}
                                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl uppercase tracking-widest"
                                >
                                    {trip.tripType === TripType.AI ? 'SAVE MY PLAN' : 'BOOK ADVENTURE'}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TripDetails;
