
import './App.css'
import Login from './auth/Login';
import Register from './auth/Register'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Dashboard from './pages/user/UserDashboard';
import EditProfile from './component/EditProfile';
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

function App() {

  return (
    <>
      <Toaster position="top-center" />

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />



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

          {/* <Route path='/counter' element={<Counter />} /> */}
          {/* <Route path='/admin/create-trip' element={<AdminCreateTrip />} />
          <Route path='/admin/trips' element={<AdminTrips />} /> */}
        </Routes>
      </AuthProvider>


    </>
  )
}

export default App;
