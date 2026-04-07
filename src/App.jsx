
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Payment from './pages/admin/Payment';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast'
import 'sweetalert2/dist/sweetalert2.min.css';
import PublicRoutes from './routes/PublicRoutes';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';



export const APPNAME = "InexTrip"
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
      <Toaster position="top-center" />
      {/* <swal /> */}
      {/* <new Swal /> */}

      {/* {isloading ? (
        <Loading />
      ) : ( */}

      <AuthProvider>

        <Routes>

          {PublicRoutes()}
          {UserRoutes()}
          {AdminRoutes()}

          {/* Common */}
          <Route path="/payment/:id" element={<Payment />} />
        </Routes>

      </AuthProvider>
      {/* )} */}
    </>
  )
}

export default App;
