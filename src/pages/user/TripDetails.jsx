import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../component/layouts/Navbar';
import Footer from '../../component/layouts/Footer';
import { fetchTripById } from '../../services/tripServices';
import { useAuth } from '../../context/AuthContext';
import RelatedTrips from '../../component/user/RelatedTrips';
import ReviewSection from '../../component/user/ReviewSection';
import TripContent from '../../component/user/TripContent';
import { TripPhotos } from '../../component/user/TripPhotos';

const TripDetails = () => {
    const { id } = useParams();

    const [trip, setTrip] = useState(null);
    const { user } = useAuth();


    const allTrips = async () => {
        const res = await fetchTripById(id);
        setTrip(res.trip)
    }
    useEffect(() => {
        const loadData = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            await allTrips();
        };
        loadData();
    }, [id]);    // ✅ runs every time the trip ID changes in the URL

    if (!trip) {
        return (
            <div className="p-10 text-center font-bold text-slate-400">
                Loading trip details...
            </div>
        );
    }

    return (
        <div className="h-screen  bg-slate-50 flex flex-col">
            <Navbar user={user} onLogout={() => { }} />

            <main className="w-full px-10 py-12 flex-grow">

                <TripPhotos trip={trip} />
                <TripContent trip={trip} />
                <RelatedTrips trip={trip} />
                <ReviewSection tripId={trip._id} />
            </main>
            <Footer />
        </div>
    );
};

export default TripDetails;
