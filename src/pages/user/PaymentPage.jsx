import { jsPDF } from "jspdf";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchTripById } from '../../services/tripServices';
import { savePayment } from '../../services/paymentService';
import Navbar from '../../component/Navbar';
import { saveHistory } from '../../services/historyService';
import { useAuth } from '../../context/AuthContext';



const PaymentPage = () => {

  const { user } = useAuth();
  const { tripId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const persons = parseInt(queryParams.get('persons') || '1');

  const [trip, setTrip] = useState(null);
  const [method, setMethod] = useState('QR');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const allTrips = await fetchTripById(tripId);
        setTrip(allTrips.trip);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrip();
  }, [tripId]);

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
        tripId: tripId,
        amount: amount,
        paymentMethod: method,
        transactionId: generatedTxn,
        status: "SUCCESS",
        date: new Date()
      };


    await savePayment(payment);

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    // Fix: Accessing jspdf from window object by casting to any to bypass TypeScript property check
    if (!trip) return;

    const doc = new jsPDF();
    const totalAmount = trip.price * persons;


    // Header
    doc.setFillColor(79, 70, 229); // Indigo-600
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('TRIPPLANNER AI', 20, 25);
    doc.setFontSize(10);
    doc.text('OFFICIAL BOOKING INVOICE', 20, 32);

    // Body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(`Invoice for ${user.fullname}`, 20, 60);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${txnId}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 90);
    doc.text(`Destination: ${trip.to}`, 20, 100);
    doc.text(`Origin: ${trip.from}`, 20, 110);
    doc.text(`Group Size: ${persons} Person(s)`, 20, 120);

    // Pricing Table
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 140, 170, 40, 'F');
    doc.setFontSize(14);
    doc.text('Summary', 30, 150);
    doc.setFontSize(10);
    doc.text(`Package Base Rate: INR ${trip.price}`, 30, 160);
    doc.text(`Total Travelers: ${persons}`, 30, 168);

    doc.setFontSize(16);
    doc.text(`TOTAL PAID: INR ${totalAmount.toLocaleString()}`, 30, 185);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for choosing TripPlanner AI. This is a computer-generated document.', 20, 280);
    doc.text('Contact: support@tripplanner.ai | Registered for Project Exhibition 2026', 20, 285);

    doc.save(`Invoice_${trip.to}_${txnId}.pdf`);
  };

  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  const totalPay = trip.price * persons;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} onLogout={() => { }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {!success ? (
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-600 p-10 text-white text-center">
              <h1 className="text-3xl font-black mb-2 tracking-tight">Booking Confirmation</h1>
              <p className="text-indigo-100 font-bold uppercase tracking-widest text-sm">Trip to {trip.to} • {persons} {persons === 1 ? 'Person' : 'Persons'}</p>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Choose Payment Method
                </h2>
                <div className="space-y-4">
                  <button onClick={() => setMethod('QR')} className={`w-full p-5 rounded-3xl border-2 text-left flex items-center justify-between transition-all ${method === 'QR' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div><p className="font-bold text-slate-800">UPI QR Scan</p><p className="text-xs text-slate-500 font-medium">Pay via GPay, PhonePe, Paytm</p></div>
                    <span className="text-2xl">📱</span>
                  </button>
                  <button onClick={() => setMethod('UPI')} className={`w-full p-5 rounded-3xl border-2 text-left flex items-center justify-between transition-all ${method === 'UPI' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div><p className="font-bold text-slate-800">UPI ID / Phone</p><p className="text-xs text-slate-500 font-medium">Enter your UPI VPA</p></div>
                    <span className="text-2xl">🏦</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Summary
                </h2>
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Base Fare (₹{trip.price} x {persons})</span>
                    <span>₹{trip.price * persons}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-slate-900 border-t border-slate-200 pt-4">
                    <span>Total Amount</span>
                    <span>₹{totalPay.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  disabled={loading}
                  onClick={handlePayment}
                  className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:bg-slate-800 disabled:bg-slate-300 transition-all uppercase tracking-widest shadow-xl"
                >
                  {loading ? 'Processing...' : `Confirm Payment`}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-16 text-center shadow-2xl border border-slate-100 animate-bounce-in">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-slate-500 font-medium mb-12">Your booking for {persons} {persons === 1 ? 'person' : 'persons'} to {trip.to} is confirmed.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={downloadInvoice}
                className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-black hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h10a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download E-Invoice
              </button>
              <button onClick={() => navigate('/history')} className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest shadow-xl shadow-indigo-100">Go to My History</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaymentPage;
