
import React, { useState, useEffect } from 'react';
// import { User, Review, Trip } from '../types';
// import { apiService } from '../services/apiService';
// import { motion, AnimatePresence } from 'motion/react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { fetchReview } from '../../services/reviewServices';
import AdminSidebar from '../../component/admin/AdminSidebar';
import AdminHeader from '../../component/admin/AdminHeader';
import { AnimatePresence, motion } from 'motion/react';

const AdminReviews = ({ onLogout }) => {

  const { user } = useAuth();
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState()

  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [filterCategory, setFilterCategory] = useState('All');


  useEffect(() => {

    const loadData = async () => {
      try {
        const response = await fetchReview();
        setReviews(response.review);
        console.log("fetchReviews:", response.review)

      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();

  }, []);
  // const navigate = useNavigate();
  // const location = useLocation();
  // 
  // 
  // const [reviews, setReviews] = useState<Review[]>([]);
  // const [trips, setTrips] = useState<Trip[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const [reviewsData, tripsData] = await Promise.all([
  //       apiService.getAllReviews(user),
  //       apiService.getTrips()
  //     ]);
  //     setReviews(reviewsData);
  //     setTrips(tripsData);
  //   } catch (error) {
  //     console.error('Error fetching admin reviews:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getTripCategory = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    return trip ? trip.category : 'Unknown';
  };

  // const getTripName = (tripId: string) => {
  //   const trip = trips.find(t => t.id === tripId);
  //   return trip ? `${trip.from} to ${trip.to}` : 'Unknown Trip';
  // };

  const filteredReviews = reviews.filter(review => {
    const category = getTripCategory(review.tripId);
    // const tripName = getTripName(review.tripId);
    const matchesCategory = filterCategory === 'All' || category === filterCategory;
    const matchesSearch = tripName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Heritage', 'Mountains', 'Beaches', 'Cities'];

  // const sidebarLinks = [
  //   { path: '/admin', label: 'Overview', icon: '⚡' },
  //   { path: '/admin/users', label: 'Explorers', icon: '👥' },
  //   { path: '/admin/trips', label: 'Inventory', icon: '🗺️' },
  //   { path: '/admin/payments', label: 'Ledger', icon: '💰' },
  //   { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
  // ];

  return (
    <div className="h-screen bg-slate-50 flex text-slate-900 transition-all duration-300 overflow-hidden">
      {/* Sidebar - TOGGLEABLE */}
      <AdminSidebar isSidebarVisible={isSidebarVisible} />


      {/* Main Content */}
      <main className="flex-grow h-full overflow-y-auto overflow-x-hidden transition-all duration-300 scroll-smooth">
        <AdminHeader
          user={user}
          isSidebarVisible={isSidebarVisible}
          setSidebarVisible={setSidebarVisible}
          setIsProfileOpen={setIsProfileOpen}
          title="Review Management"
          subtitle="Monitor explorer feedback"
        >
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search reviews..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-bold text-slate-700 text-xs w-64"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>
        </AdminHeader>

        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'
                  : 'bg-white text-slate-400 border border-slate-100 hover:border-indigo-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 bg-white rounded-[64px] border border-slate-100">
              <div className="w-16 h-16 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Analyzing feedback data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-100/50 transition-colors" />

                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                          <img src={review.userPhoto} className="w-full h-full object-cover" alt={review.userName} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 tracking-tight">{review.userName}</h4>
                          <div className="flex text-amber-400 text-[10px]">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-6 relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{review.tripId}</span>
                        {/* <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{getTripCategory(review.tripId)}</span> */}
                      </div>
                      <h5 className="text-sm font-black text-slate-800 mb-4 line-clamp-1">{review.tripId}</h5>
                      {/* <h5 className="text-sm font-black text-slate-800 mb-4 line-clamp-1">{getTripName(review.tripId)}</h5> */}
                      <p className="text-slate-500 font-bold text-sm leading-relaxed italic line-clamp-3">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center relative z-10">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-emerald-50 text-slate-300 hover:text-emerald-500 rounded-xl transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-xl transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                        View Trip
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div className="bg-white border-4 border-dashed border-slate-100 rounded-[64px] p-32 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No reviews found</h3>
              <p className="text-slate-400 font-medium mt-2">Try adjusting your filters or search term.</p>
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

export default AdminReviews;
