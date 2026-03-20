import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import { fetchTripById } from '../../services/tripServices';
import { useAuth } from '../../context/AuthContext';
import useTrips from '../../hooks/useTrips';
import { saveHistory } from '../../services/historyService';
import { createReview, fetchReviewByTripId } from '../../services/reviewServices';


const TripType = {
    AI: "AI",
    JOIN: "JOIN"
};

const TripDetails = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const { user } = useAuth();
    const { trips } = useTrips();
    const [numPersons, setNumPersons] = useState(1);
    const [showGallery, setShowGallery] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [relatedTrips, setRelatedTrips] = useState([])
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);
      const [reviews, setReviews] = useState([]);

    const allTrips = async () => {
        const res = await fetchTripById(id);
        const review_res = await fetchReviewByTripId(id);
        console.log("TripDetails : ", res.trip)
        console.log("review response : ", review_res.reviews)
        setReviews(review_res.reviews);
        setTrip(res.trip)
    }

    useEffect(() => {
        if (trip && trips.length > 0) {
            const data = trips.filter(f => f.category === trip.category && f._id !== trip._id);
            console.log("filterdata:", data);
            setRelatedTrips(data);
        }
    }, [trip, trips]);


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
            saveHistory({
                userId: user.id,
                tripId: trip.id,
                type: 'CREATED',
            });

            alert("Itinerary saved to your Created Trips!");
            navigate('/history');
        } else {
            navigate(`/payment/${trip._id}?persons=${numPersons}`);
            // admin/payments
        }
    };
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login to give a review.");
            navigate('/login');
            return;
        }

        if (!newReview.comment.trim()) {
            alert("Please enter a comment.");
            return;
        }

        setSubmittingReview(true);

        try {
            const reviewData = {
                tripId: id,
                rating: newReview.rating,
                comment: newReview.comment
            };

            const res = await createReview(reviewData);

            // ✅ Correct way
            setReviews((prev) => [res.review, ...prev]);

            setNewReview({ rating: 5, comment: '' });

            alert("Review posted successfully!");

        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to post review");
            }
        } finally {
            setSubmittingReview(false);
        }
    };
    // const handleReviewSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!user) {
    //         alert("Please login to give a review.");
    //         navigate('/login');
    //         return;
    //     }
    //     if (!trip) return;

    //     if (!newReview.comment.trim()) {
    //         alert("Please enter a comment.");
    //         return;
    //     }

    //     setSubmittingReview(true);
    //     try {
    //         const review = {
    //             tripId: id,
    //             rating: newReview.rating,
    //             comment: newReview.comment
    //         };
    //         console.log("review :", review)
    //         const savedReview = await createReview(review);
    //         setReviews([savedReview, ...review]);
    //         // setNewReview({ rating: 5, comment: '' });
    //         alert("Review posted successfully!");
    //     } catch (err) {
    //         console.error(err);
    //         alert("Failed to post review");
    //     } finally {
    //         setSubmittingReview(false);
    //     }
    // };



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

                {/* Related Trips Section */}
                {relatedTrips.length > 0 && (
                    <section className="mt-24 mb-16">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-4">
                                    <span className="w-2 h-10 bg-indigo-600 rounded-full" />
                                    RELATED ADVENTURES
                                </h2>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest px-6">Handpicked journeys similar to this one</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('related-scroll');
                                        if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                                    }}
                                    className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"
                                >
                                    &larr;
                                </button>
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('related-scroll');
                                        if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                                    }}
                                    className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"
                                >
                                    &rarr;
                                </button>
                            </div>
                        </div>
                        <div id="related-scroll" className="flex overflow-x-auto pb-8 gap-8 no-scrollbar snap-x scroll-smooth">
                            {relatedTrips.map((rTrip) => (
                                <Link
                                    key={rTrip.id}
                                    to={`/trip/${rTrip.id}`}
                                    className="min-w-[320px] md:min-w-[400px] bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all snap-start group"
                                >
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={rTrip.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={rTrip.to} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-8 text-white">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{rTrip.from} to</p>
                                            <h4 className="text-2xl font-black tracking-tight">{rTrip.to}</h4>
                                        </div>
                                        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
                                            {rTrip.dayPlan.length} Days
                                        </div>
                                    </div>
                                    <div className="p-8 flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting From</p>
                                            <p className="text-2xl font-black text-indigo-600">₹{rTrip.price.toLocaleString()}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            &rarr;
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <section className="mt-24 mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                            EXPLORER <span className="text-indigo-600">REVIEWS</span>
                        </h2>
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">Real stories from real travelers</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Review Form */}
                        <div className="lg:col-span-4">
                            <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-2xl sticky top-24">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-2">Share Your Story</h3>
                                    <p className="text-slate-400 text-sm font-medium">Your feedback helps fellow explorers find their perfect journey.</p>
                                </div>

                                <form onSubmit={handleReviewSubmit} className="space-y-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">How would you rate it?</label>
                                        <div className="flex justify-between bg-slate-50 p-4 rounded-3xl border border-slate-100">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className={`text-3xl transition-all ${star <= newReview.rating ? 'text-amber-400 scale-125 drop-shadow-sm' : 'text-slate-200 grayscale'}`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Your Journey Details</label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            placeholder="Tell us about the highlights, the food, and the overall vibe..."
                                            className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-[32px] outline-none transition-all font-bold text-slate-700 min-h-[200px] resize-none shadow-inner"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submittingReview}
                                        className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        {submittingReview ? 'Submitting...' : 'Post My Review'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-8 space-y-10">
                            {reviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl hover:shadow-2xl transition-all flex flex-col">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                                                        <img src={review.userId?.profilePhoto || user.profilePhoto} className="w-full h-full object-cover" alt={review.userId?.fullname || user.fullname} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 tracking-tight">{review.userId?.fullname || user.fullname}</h4>
                                                        <div className="flex text-amber-400 text-xs mt-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 px-4 py-2 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                    {/* {review.createdAt} */}
                                                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                            <div className="relative flex-grow">
                                                <span className="absolute -top-4 -left-2 text-6xl text-indigo-50 font-serif">"</span>
                                                <p className="text-slate-600 font-bold leading-relaxed relative z-10 italic pl-4">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border-4 border-dashed border-slate-100 rounded-[64px] p-32 text-center flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6">✍️</div>
                                    <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No stories yet</h3>
                                    <p className="text-slate-400 font-medium mt-2">Be the first to share your adventure!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default TripDetails;
