
import { useState } from 'react';



import { useNavigate } from 'react-router-dom';

import CategorySection from '../../component/common/CategorySection';
import useTrips from '../../hooks/useTrips';
import { categoriesConst } from '../../constants/categories';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../component/layouts/Navbar';
import Footer from '../../component/layouts/Footer';


const Dashboard = () => {
  const navigate = useNavigate();
  const { trips, loading, error } = useTrips();
  const { user, loadingUser, logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState(null);

  const firstName = user?.fullname?.split(" ")[0] || "Explorer";
  if (loadingUser) {
    return <div className="text-center py-20">Loading user...</div>;
  }
  if (loading) {
    return <div className="text-center py-20">Loading trips...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  return (
  <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar logout={logout} />
      <main className="flex-grow overflow-y-auto ">
        {/* Top Header Section with Blue/Indigo Sunset Gradient */}
        <div className="bg-gradient-to-t from-gray-200 to-gray-100 via-gray-100 to-gray py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left: Profile Information as per reference 2 */}
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl">
                  {/* <img src={user?.profilePhoto} className="w-full h-full object-cover" alt="Profile" /> */}

                  {user?.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      className=" w-33 h-32 border-5 border-black rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full text-6xl rounded-full border-5 border-black bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {user?.fullname?.charAt().toUpperCase()}
                    </div>
                  )}

                </div>
                <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-slate-800 leading-tight">
                  Welcome,<br /> <span className="capitalize">{firstName}</span>
                </h2>
                <button
                  onClick={() => navigate('/edit-profile')}
                  className="px-6 py-2 border-2 border-indigo-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-400 transition-all shadow-sm"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Right: Plan Text */}
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 mb-6 indigo">Plan your journey your way!</h1>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Our Trip Planner lets you create a personalized trip easily. Just select your start and destination, travel dates, budget, and transport mode. The system organizes everything for you, helping you save time and enjoy a smooth, stress-free journey.
              </p>
            </div>
          </div>
        </div>

        {/* Start Planning Hero Banner */}
        <section className="relative rounded-[40px] h-[600px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full blur-sm object-cover brightness-[0.5] scale-105"
            alt="Mountains and Skies"
          />

          <div className="absolute inset-0 bg-gradient-to-t bg-blur-3xl from-indigo-900/60 via-transparent to-indigo-500/10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white drop-shadow-2xl">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-blue-200">Start planning your trip.</h3>
            <p className="text-xl font-bold mb-10 opacity-90">Make your travel simple and smart.</p>

            <div className="flex flex-row gap-6 items-center justify-center flex-wrap mt-8">

              <button
                onClick={() => navigate('/create-trip')}
                className="px-10 py-4 rounded-full text-lg font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_15px_40px_rgba(99,102,241,0.5)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(99,102,241,0.6)]active:scale-95transition-all duration-300">
                Create Trip
              </button>


              <button
                onClick={() => navigate('/join-trip')}
                className="px-10 py-4 rounded-full text-lg font-extrabold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md border border-white/20shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:bg-black/60 hover:scale-105active:scale-95 transition-all duration-300" >
                Join Trip
              </button>
            </div>
          </div>
        </section>

        {/* Category Icons Bar (Matching reference image 3) */}
        <section className="relative z-20 max-w-5xl mx-auto px-4 -mt-24">
          <div className="bg-slate-200 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-00 p-8 grid grid-cols-2 md:grid-cols-4 gap-4">

            {categoriesConst.map((cat) => (

              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  const el = document.getElementById(`section-${cat.name.toLowerCase()}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`group flex flex-col items-center p-8 rounded-[32px] transition-all border-2 ${activeCategory === cat.name ? 'bg-indigo-50 border-indigo-400' : 'bg-transparent border-transparent hover:bg-slate-300'
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
            ? [categoriesConst.find(c => c.name === activeCategory)]
            : categoriesConst
          ).map((cat) => (
            <section key={cat.name} id={`section-${cat.name.toLowerCase()}`} className="max-w-7xl mx-auto px-6">
              <CategorySection
                cat={cat}   // ✅ FIXED
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                trips={trips}
                user={user}
              />
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
