
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProfileSidebar from '../../component/ProfileSidebar';
import { createTrip, deleteTrip, fetchTrip } from '../../services/tripServices';
import AdminSidebar, { sidebarLinks } from '../../component/admin/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { FieldArray, useFormik } from 'formik';

import * as Yup from "yup";
import useTrips from '../../hooks/useTrips';
import TripForm from '../../component/admin/TripForm';


const AdminTrips = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { trips, refetch } = useTrips();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [trips, setTrips] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [isDeploying, setIsDeploying] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("params :", params)
    if (params.get('create') === 'true') {
      setShowCreateModal(true);
    }
  }, [location.search]);

  const handleDeleteTrip = async (id) => {
    if (window.confirm("Permanently decommission this travel package from all public inventories?")) {
      try {
        await deleteTrip(id);
        await refetch();
        alert("Inventory package decommissioned.");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // ==========================================================================================


  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">

      <AdminSidebar isSidebarVisible={isSidebarVisible} />

      <main className="flex-grow">
        <header className="p-8 border-b border-slate-200 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-40">
          <button
            onClick={() => setSidebarVisible(!isSidebarVisible)}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all flex flex-col gap-1 items-center justify-center w-12 h-12"
          >
            <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
            <span className="w-4 h-0.5 bg-slate-900 rounded-full" />
            <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory Control</h1>
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-1">Active Batch Units: {trips.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-indigo-700 uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all"
            >
              Deploy Manual Package
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-xl border-2 border-white shadow-md overflow-hidden"
            >
              {/* <img src={user.profilePhoto} className="w-full h-full object-cover" alt="" /> */}
              {user?.profilePhoto ? (
                <img
                  src={user?.profilePhoto}
                  className="w-full h-full border border-blue-600  object-cover"
                />
              ) : (
                <div className="w-full h-full  bg-indigo-600 border border-blue-600  text-white flex items-center justify-center font-bold">
                  {user?.fullname?.charAt().toUpperCase()}

                </div>
              )}
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trips?.map(trip => (
              <div key={trip._id} className="bg-white rounded-[32px] overflow-hidden border border-slate-200 flex flex-col group shadow-sm hover:border-indigo-400 transition-all">
                <div className="h-56 relative overflow-hidden">
                  <img src={trip.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black text-indigo-600 uppercase tracking-widest border border-slate-100">
                    {trip.tripType}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[8px] font-black text-indigo-100 uppercase tracking-widest mb-0.5">{trip.from}</p>
                    <h3 className="text-xl font-black tracking-tight leading-none">{trip.to}</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Commercials</p>
                      <p className="text-lg font-black text-emerald-600 leading-none">₹{trip.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Timeline</p>
                      <p className="text-sm font-black text-slate-900 leading-none">{trip.dayPlan.length} Days</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-50">
                    <button onClick={() => navigate(`/trip/${trip._id}`)} className="flex-1 bg-slate-50 py-3 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 hover:text-indigo-600 transition-all">Review</button>
                    <button
                      onClick={() => handleDeleteTrip(trip._id)}
                      className="flex-1 bg-rose-50 py-3 rounded-xl text-[9px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Deploy Manual Package Modal */}
      {showCreateModal && (
        <TripForm setShowCreateModal={setShowCreateModal} />
      )}
    </div >
  );
};

export default AdminTrips;
