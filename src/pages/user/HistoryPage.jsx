
import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
// import { fetchTrip } from '../../services/tripServices';
import { clearHistory, fetchHistoryByUserId } from '../../services/historyService';

const HistoryPage = () => {
    const { user } = useAuth()
    const [history, setHistory] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [filterState, setFilterState] = useState({
        all: true,
        created: false,
        joined: false
    });

    const loadData = async () => {
        try {

            const res = await fetchHistoryByUserId();
            setHistory(res.history);
            console.log("history : ", res.history);
            // const [h, t] = await Promise.all([
            //     fetchHistoryByUserId(),
            //     fetchTrip()
            // ]);
            // setHistory(h.history);
            // console.log("fetchHistoryByUserId :", h)
            // setTrips(t.trip);
            // console.log("trips:", t);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCheckboxChange = (name) => {
        if (name === 'all') {
            setFilterState({ all: true, created: false, joined: false });
        } else {
            setFilterState({
                ...filterState,
                all: false,
                [name]: !filterState[name]
            });
        }
    };

    const filteredHistory = history.filter(h => {
        if (filterState.all) return true;
        if (filterState.created && h.type === 'CREATED') return true;
        if (filterState.joined && h.type === 'JOINED') return true;
        return false;
    });

    const handleClearHistory = async () => {
        try {
            clearHistory()
            setHistory([]);
            setShowClearConfirm(false);
        } catch (err) {
            console.error(err);
            alert("Failed to clear history");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar user={user} onLogout={() => { }} />

            <main className="max-w-5xl mx-auto px-4 py-12 flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">Travel Journey</h1>
                        <p className="text-xl text-slate-500 font-medium">Relive your planned and joined adventures.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="bg-white text-rose-500 border-2 border-rose-100 px-8 py-3 rounded-2xl font-black hover:bg-rose-50 transition-all text-sm uppercase tracking-widest shadow-lg shadow-rose-100"
                        >
                            Clear My History
                        </button>
                    </div>
                </div>

                {/* Filter Checkboxes */}
                <div className="flex flex-wrap items-center gap-8 mb-12 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Filter Records:</span>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filterState.all}
                            onChange={() => handleCheckboxChange('all')}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                        />
                        <span className={`font-bold transition-all ${filterState.all ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'}`}>All Trips</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filterState.created}
                            onChange={() => handleCheckboxChange('created')}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                        />
                        <span className={`font-bold transition-all ${filterState.created ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'}`}>Created Trip</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filterState.joined}
                            onChange={() => handleCheckboxChange('joined')}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                        />
                        <span className={`font-bold transition-all ${filterState.joined ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'}`}>Joined Trips</span>
                    </label>
                </div>

                {filteredHistory?.length === 0 ? (
                    <div className="bg-white rounded-[48px] p-24 text-center border border-slate-100 shadow-xl">
                        <div className="text-8xl mb-8 opacity-20">🏜️</div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">No records found</h2>
                        <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">Either you haven't booked anything yet or the filters are active.</p>
                        <Link to="/join-trip" className="bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 inline-block transition-all uppercase tracking-widest text-sm">
                            Discover Tours
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredHistory?.map(item => {
                            // const trip = trips?.find(t => String(t._id) === String(item.tripId));
                            // if (!trip) return null;

                            return (
                                <div key={item._id} className="bg-white rounded-[40px] overflow-hidden shadow-sm  border border-slate-100 flex flex-col md:flex-row transition-all group ">
                                    <div className="md:w-80 h-48 md:h-auto overflow-hidden relative">
                                        <img src={item.tripId.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-md">
                                            {item.type === 'CREATED' ? 'AI Planned' : 'Community'}
                                        </div>
                                    </div>
                                    <div className="flex-grow p-10 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-3xl font-black text-slate-900">{item.tripId.to}</h3>
                                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">{item.tripId.from} &bull; {item.tripId.startDate}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-slate-900 leading-none">₹{item.tripId.price.toLocaleString()}</p>
                                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${item.type === 'JOINED' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                        {item.type === 'JOINED' ? 'Paid & Booked' : 'Saved Plan'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Departure</p>
                                                    <p className="text-sm font-bold text-slate-800">{new Date(item.tripId.startDate).toLocaleDateString('en-GB')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Travel Mode</p>
                                                    <p className="text-sm font-bold text-slate-800">{item.tripId.transportMode}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Ref ID</p>
                                                    <p className="text-sm font-bold text-slate-800">#{item._id.slice(-6).toUpperCase()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Agency</p>
                                                    <p className="text-sm font-bold text-slate-800">{item.tripId.description?.includes('Organized by') ? item.tripId.description.split('.')[0].replace('Organized by ', '') : 'InexTrip'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-8">
                                            <Link to={`/trip/${item.tripId._id}`} className="flex-1 text-center bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest text-xs">View Full Details</Link>
                                            <button className="px-8 bg-slate-50 text-slate-500 border border-slate-100 rounded-2xl font-bold hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px]">Support</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Confirmation Modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowClearConfirm(false)} />
                    <div className="relative bg-white rounded-[48px] p-12 max-w-md w-full text-center shadow-2xl animate-bounce-in border-8 border-slate-50">
                        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">Clear History?</h3>
                        <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm">This will permanently delete your booking records and AI itineraries. This action cannot be undone.</p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleClearHistory}
                                className="w-full bg-rose-500 text-white py-4 rounded-3xl font-black hover:bg-rose-600 transition-all shadow-xl shadow-rose-100 uppercase tracking-[0.2em] text-xs"
                            >
                                Yes, Clear All
                            </button>
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="w-full bg-slate-100 text-slate-600 py-4 rounded-3xl font-bold hover:bg-slate-200 transition-all uppercase tracking-[0.2em] text-xs"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default HistoryPage;
