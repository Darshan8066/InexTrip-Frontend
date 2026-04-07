import jsPDF from "jspdf";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from "../../component/layouts/Navbar";
import { motion, AnimatePresence } from 'motion/react';
import { fetchTripById } from '../../services/tripServices';
import { savePayment } from '../../services/paymentService';
import { saveHistory } from '../../services/historyService';
import { useAuth } from '../../context/AuthContext';

const Payment = () => {
    const { user,logout } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const persons = parseInt(queryParams.get('persons') || '1');

    const [trip, setTrip] = useState(null);
    const [step, setStep] = useState(1);
    const [passengers, setPassengers] = useState(
        Array.from({ length: persons }, () => ({ name: '', age: 0, gender: 'Male', mobile: '' }))
    );
    const [contactInfo, setContactInfo] = useState({
        email: user?.email || '',
        mobile: user?.mobile || '',
        emergencyName: '',
        emergencyPhone: '',
        specialRequests: ''
    });
    const [method, setMethod] = useState('QR');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [txnId, setTxnId] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const allTrips = await fetchTripById(id);
                console.log("allTrips : ", allTrips.trip);
                setTrip(allTrips.trip);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrip();
    }, []);

    const handlePassengerChange = (index, field, value) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [field]: value };
        setPassengers(newPassengers);
    };

    const handlePayment = async () => {
        if (!trip) return;
        setLoading(true);

        try {
            await new Promise(res => setTimeout(res, 2000));

            const amount = trip.price * persons;
            const generatedTxn = `TXN${Math.floor(Math.random() * 100000000)}`;
            setTxnId(generatedTxn);

            const payment = {
                id: `pay-${Date.now()}`,
                userId: user._id,
                tripId: trip._id,
                amount: amount,
                paymentMethod: method,
                transactionId: generatedTxn,
                status: "SUCCESS",
                date: Date.now(),
                numPersons: persons,
                passengers: passengers,
                contactEmail: contactInfo.email,
                contactMobile: contactInfo.mobile,
                emergencyContactName: contactInfo.emergencyName,
                emergencyContactPhone: contactInfo.emergencyPhone,
                specialRequests: contactInfo.specialRequests
            };

            const history = {
                id: `hist-${Date.now()}`,
                userId: user._id,
                tripId: trip._id,
                paymentId: payment._id,
                type: 'JOINED',
                date: Date.now()
            };

            await savePayment(payment);
            await saveHistory(history);

            setSuccess(true);
            setStep(3);
        } catch (err) {
            console.error(err);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const downloadInvoice = () => {
        console.log("Download clicked");
        // if (!trip || !window.jspdf) return;
        // const { jsPDF } = window.jspdf;
        // const doc = new jsPDF();
        if (!trip) return;
        const doc = new jsPDF();
        const totalAmount = trip.price * persons;

        // Header
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 50, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('TRIPPLANNER AI', 20, 30);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('THE FUTURE OF EXPLORATION', 20, 38);
        // doc.text(`INVOICE NO: ${txnId}`, 140, 30);
        doc.text(`INVOICE NO: ${txnId || "N/A"}`, 140, 30);
        doc.text(`DATE: ${new Date().toLocaleDateString('en-GB')}`, 140, 38);

        // Trip Info
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('ADVENTURE DETAILS', 20, 70);

        doc.setDrawColor(15, 23, 42);
        doc.setLineWidth(0.5);
        doc.line(20, 75, 190, 75);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Destination: ${trip.to}`, 20, 85);
        doc.text(`Origin: ${trip.from}`, 20, 93);
        doc.text(`Duration: ${trip.dayPlan.length} Days`, 120, 85);
        doc.text(`Transport: ${trip.transportMode}`, 120, 93);

        // Contact Info
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('CONTACT INFORMATION', 20, 110);
        doc.line(20, 115, 190, 115);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Email: ${contactInfo.email}`, 20, 125);
        doc.text(`Mobile: ${contactInfo.mobile}`, 20, 133);
        doc.text(`Emergency Contact: ${contactInfo.emergencyName} (${contactInfo.emergencyPhone})`, 100, 125);

        // Passenger Info
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('PASSENGER MANIFEST', 20, 155);
        doc.line(20, 160, 190, 160);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('NO.', 20, 170);
        doc.text('NAME', 40, 170);
        doc.text('AGE', 100, 170);
        doc.text('GENDER', 130, 170);
        doc.text('MOBILE', 160, 170);

        doc.setFont('helvetica', 'normal');
        passengers.forEach((p, i) => {
            const y = 180 + (i * 10);
            doc.text(`${i + 1}`, 20, y);
            doc.text(`${p.name}`, 40, y);
            doc.text(`${p.age}`, 100, y);
            doc.text(`${p.gender}`, 130, y);
            doc.text(`${p.mobile}`, 160, y);
        });

        // Summary
        const summaryY = 200 + (passengers.length * 10);
        doc.setFillColor(248, 250, 252);
        doc.rect(20, summaryY, 170, 45, 'F');

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYMENT SUMMARY', 30, summaryY + 15);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Base Package Rate:`, 30, summaryY + 25);
        doc.text(`INR ${trip.price.toLocaleString()}`, 140, summaryY + 25);
        doc.text(`Total Travelers:`, 30, summaryY + 32);
        doc.text(`x ${persons}`, 140, summaryY + 32);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`TOTAL AMOUNT PAID:`, 30, summaryY + 45);
        doc.text(`INR ${totalAmount.toLocaleString()}`, 120, summaryY + 45);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('This is a computer-generated e-invoice for your TripPlanner AI booking.', 20, 280);
        doc.text('For support, contact support@tripplanner.ai | Project Exhibition 2026', 20, 285);

        doc.save(`Invoice_${trip.to}_${txnId}.pdf`);
    };


    if (!trip) return <div className="p-20 text-center font-black text-slate-400 uppercase tracking-widest">Adventure not found</div>;

    const totalPay = trip.price * persons;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar user={user} logout={logout} />

            <main className="max-w-5xl mx-auto px-6 py-16">
                {/* Progress Stepper */}
                <div className="flex items-center justify-center mb-16 gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-300 border border-slate-200'}`}>
                                {s < step || success ? '✓' : s}
                            </div>
                            {s < 3 && <div className={`w-16 h-1 rounded-full ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-[56px] shadow-2xl border border-slate-100 overflow-hidden"
                        >
                            <div className="bg-slate-900 p-12 text-white">
                                <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">Passenger Details</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Step 1 of 3: Manifest Information</p>
                            </div>

                            <div className="p-12 space-y-10">
                                {/* Contact Information Section */}
                                <div className="p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100">
                                    <h2 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                                        <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">📇</span>
                                        Primary Contact
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 px-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={contactInfo.email}
                                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                placeholder="For e-invoice delivery"
                                                className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 px-1">Mobile Number</label>
                                            <input
                                                type="text"
                                                value={contactInfo.mobile}
                                                onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
                                                placeholder="Primary contact number"
                                                className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 px-1">Emergency Contact Name</label>
                                            <input
                                                type="text"
                                                value={contactInfo.emergencyName}
                                                onChange={(e) => setContactInfo({ ...contactInfo, emergencyName: e.target.value })}
                                                placeholder="Relative/Friend Name"
                                                className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 px-1">Emergency Phone</label>
                                            <input
                                                type="text"
                                                value={contactInfo.emergencyPhone}
                                                onChange={(e) => setContactInfo({ ...contactInfo, emergencyPhone: e.target.value })}
                                                placeholder="Emergency number"
                                                className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 px-1">Special Requests / Notes</label>
                                        <textarea
                                            value={contactInfo.specialRequests}
                                            onChange={(e) => setContactInfo({ ...contactInfo, specialRequests: e.target.value })}
                                            placeholder="Any specific requirements or notes for the trip..."
                                            className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all h-24 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 w-full" />

                                <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">👥</span>
                                    Passenger Manifest
                                </h2>

                                {passengers.map((p, i) => (
                                    <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 relative">
                                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
                                            {i + 1}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={p.name}
                                                    onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
                                                    placeholder="As per ID"
                                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Age</label>
                                                <input
                                                    type="number"
                                                    value={p.age || ''}
                                                    onChange={(e) => handlePassengerChange(i, 'age', parseInt(e.target.value))}
                                                    placeholder="Years"
                                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Gender</label>
                                                <select
                                                    value={p.gender}
                                                    onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)}
                                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all appearance-none"
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Mobile No</label>
                                                <input
                                                    type="text"
                                                    value={p.mobile}
                                                    onChange={(e) => handlePassengerChange(i, 'mobile', e.target.value)}
                                                    placeholder="Phone"
                                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={passengers.some(p => !p.name || !p.age) || !contactInfo.email || !contactInfo.mobile}
                                        className="bg-slate-900 text-white px-12 py-5 rounded-[32px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        Continue to Payment &rarr;
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            <div className="lg:col-span-7 bg-white rounded-[56px] shadow-2xl border border-slate-100 overflow-hidden">
                                <div className="bg-indigo-600 p-12 text-white">
                                    <h2 className="text-3xl font-black tracking-tighter mb-2 uppercase">Payment Method</h2>
                                    <p className="text-indigo-200 font-bold uppercase tracking-[0.3em] text-[10px]">Step 2 of 3: Secure Checkout</p>
                                </div>
                                <div className="p-12 space-y-6">
                                    <button onClick={() => setMethod('QR')} className={`w-full p-8 rounded-[40px] border-2 text-left flex items-center justify-between transition-all ${method === 'QR' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">📱</div>
                                            <div>
                                                <p className="font-black text-slate-800 text-lg">UPI QR Scan</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">GPay, PhonePe, Paytm</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'QR' ? 'border-indigo-600' : 'border-slate-200'}`}>
                                            {method === 'QR' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                                        </div>
                                    </button>
                                    <button onClick={() => setMethod('UPI')} className={`w-full p-8 rounded-[40px] border-2 text-left flex items-center justify-between transition-all ${method === 'UPI' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">🏦</div>
                                            <div>
                                                <p className="font-black text-slate-800 text-lg">UPI ID / Phone</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Direct VPA Transfer</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'UPI' ? 'border-indigo-600' : 'border-slate-200'}`}>
                                            {method === 'UPI' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                                        </div>
                                    </button>

                                    <div className="pt-8">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-colors"
                                        >
                                            &larr; Back to Passenger Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-8">
                                <div className="bg-white p-10 rounded-[56px] shadow-2xl border border-slate-100">
                                    <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Trip Summary</h3>
                                    <div className="space-y-6 mb-10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Adventure</span>
                                            <span className="font-black text-slate-800">{trip?.to}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Base Rate</span>
                                            <span className="font-black text-slate-800">₹{trip?.price?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Travelers</span>
                                            <span className="font-black text-slate-800">x {persons}</span>
                                        </div>
                                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Total Amount</span>
                                            <span className="text-3xl font-black text-indigo-600 tracking-tighter">₹{totalPay?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        onClick={handlePayment}
                                        className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        {loading ? 'Verifying...' : 'Pay Now'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto bg-white rounded-[64px] p-20 text-center shadow-2xl border border-slate-100"
                        >
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-50 rotate-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Adventure Booked!</h1>
                            <p className="text-slate-400 font-bold mb-16 uppercase tracking-widest text-xs">Your journey to {trip.to} begins soon.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    onClick={downloadInvoice}
                                    className="bg-white border-2 border-slate-100 text-slate-900 px-8 py-5 rounded-[32px] font-black hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h10a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download E-Invoice
                                </button>
                                <button
                                    onClick={() => navigate('/history')}
                                    className="bg-indigo-600 text-white px-8 py-5 rounded-[32px] font-black hover:bg-indigo-700 transition-all uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-100"
                                >
                                    View My History
                                </button>
                            </div>


                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div >
    );
};

export default Payment;
