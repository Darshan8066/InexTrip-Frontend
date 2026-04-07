
import React, { useState } from 'react';

import Footer from '../component/layouts/Footer';
import { Navbar } from '../component/layouts/Navbar';
import useTrips from '../hooks/useTrips';
import { Link, useNavigate } from 'react-router-dom';
import { categoriesConst } from '../constants/categories';
import CategorySection from '../component/common/CategorySection';
import { useAuth } from '../context/AuthContext'; 


const Home = () => {
  const navigate = useNavigate();

  const { trips, loading,  } = useTrips();
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);


  if (loading) {
    return <div className="text-center py-20">Loading trips...</div>;
  }

  // if (error) {
  //   return <div className="text-center py-20 text-red-500">{error}</div>;
  // }

  const categories = categoriesConst;


  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />

      <main className="flex-grow">
        {/* Cinematic Hero */}
        <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=2070"
              className="w-full h-full object-cover scale-105 transition-all duration-1000 blur-md"
              alt="India Landscape"
            />
            {/* Fixed: Removed the white 'reflection' gradient and using a clean dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl animate-bounce-in">

            <h1 className=" text-6xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
              Discover the <br />
              <span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Incredible</span> India
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
              Personalized adventures, group journeys, and seamless bookings powered by cutting-edge AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/join-trip" className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-900/40 uppercase tracking-widest">Start Exploring</Link>

              <Link to="/login" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl font-black text-sm hover:bg-white/20 uppercase tracking-widest">Sign In to Plan</Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </section>


        {/* Category Icons Bar (Matching reference image 3) */}
        <section className="relative z-20 max-w-5xl mx-auto px-4 -mt-24">
          <div className="bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border  p-8 grid grid-cols-2 md:grid-cols-4 gap-4">

            {categories.map((cat) => (

              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  const el = document.getElementById(`section-${cat.name.toLowerCase()}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`group flex flex-col items-center p-8 rounded-[32px] transition-all border-3 ${activeCategory === cat.name ? 'bg-indigo-50 border-indigo-400 hover:bg-slate-400' : 'bg-transparent border-transparent hover:border-slate-500'
                  }`}
              >
                <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-indigo-600 transition-colors">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tripping Lists by Category as per request */}
        <div className="space-y-32 py-32 bg-gray-200">
          {(activeCategory
            ? [categories.find(c => c.name === activeCategory)]
            : categories
          ).map((cat) => (
            <section key={cat.name} id={`section-${cat.name.toLowerCase()}`} className="max-w-7xl mx-auto px-6">
              <CategorySection
                cat={cat}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                trips={trips}
                user={user}
                onBookClick={() => {
                  if (!user) {
                    setShowLoginPopup(true);
                  } else {
                    navigate("/booking"); // or whatever route
                  }
                }}
              />
            </section>
          ))}
        </div>


      </main>
      <Footer />

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white rounded-[48px] p-12 max-w-md w-full text-center shadow-2xl animate-bounce-in border-8 border-slate-50">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">🌍</div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Login Required</h3>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">To view itineraries and book group adventures, please sign in to your Explorer account.</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => navigate('/login')} className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest">Sign In Now</button>
              <button onClick={() => setShowLoginPopup(false)} className="w-full text-slate-400 py-3 font-black text-[10px] uppercase tracking-widest hover:text-slate-600">Explore Public Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
