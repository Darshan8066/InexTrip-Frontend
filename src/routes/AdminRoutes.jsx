import { Route } from "react-router-dom";
import ProtectedRoute from "../component/guards/ProtectedRoute";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserProfile from "../pages/admin/AdminUserProfile";
import { AdminTrips } from "../pages/admin/AdminTrips";
import TripForm from "../component/admin/TripForm";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminEditTrip from "../pages/admin/AdminEditTrip";

export default function AdminRoutes() {
    return (

        <Route>
           
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/users/profile/:id" element={<AdminUserProfile />} />
                <Route path="/admin/trips" element={<AdminTrips />} />
                <Route path="/admin/trips/edit/:id" element={<AdminEditTrip />} />
                <Route path="/admin/trip-form" element={<TripForm />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/reviews" element={<AdminReviews />} />

            </Route>
        </Route>
    );
}