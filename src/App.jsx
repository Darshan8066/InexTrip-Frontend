
import './App.css'
import Login from './auth/Login';
import Register from './auth/Register'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/user/UserDashboard';
import EditProfile from './component/user/EditProfile';
import TripDetails from './pages/user/TripDetails';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTrips from './pages/admin/AdminTrips';
import TripForm from './component/admin/TripForm';
import AdminPayments from './pages/admin/AdminPayments';
import PaymentPage from './pages/user/PaymentPage';
import HistoryPage from './pages/user/HistoryPage';
import Favourites from './pages/user/Favourites';
import JoinTrip from './pages/user/JoinTrip';
import AdminReviews from './pages/admin/AdminReviews';
import Loading from './pages/Loading';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast'
// import { swal } from 'sweetalert';
// import  Swal  from 'sweetalert2'

function App() {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000);

    return () => clearTimeout(timer);
  }, [])


  return (
    <>
      < Toaster position="top-center" />
      {/* <swal /> */}
      {/* <new Swal /> */}

      {isloading ? (
        <Loading />
      ) : (

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/user/dashboard" element={<Dashboard />} /> */}


            {/* User Routes */}
            <Route path='/user/dashboard' element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/payment/:tripId" element={<PaymentPage />} />
            <Route path='/trip/:id' element={<TripDetails />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/history' element={<HistoryPage />} />
            <Route path='/favourites' element={<Favourites />} />
            <Route path='/join-trip' element={<JoinTrip />} />


            {/* Admin Routes */}
            <Route path='/admin/dashboard' element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/admin/users' element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path='/admin/trips' element={<AdminTrips />} />
            <Route path='/admin/trip-form' element={<TripForm />} />
            <Route path='/admin/payments' element={<AdminPayments />} />
            <Route path='/payments' element={<AdminPayments />} />
            <Route path='/admin/reviews' element={<AdminReviews />} />

          </Routes>
        </AuthProvider>
      )}
    </>
  )
}

export default App;
