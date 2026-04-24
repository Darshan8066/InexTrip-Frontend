

import { Route } from "react-router-dom";
import ProtectedRoute from "../component/guards/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserProfile from "../pages/admin/AdminUserProfile";
import { AdminTrips } from "../pages/admin/AdminTrips";
import TripForm from "../component/admin/TripForm";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminEditTrip from "../pages/admin/AdminEditTrip";
import AdminMessages from "../pages/admin/AdminMessages";
import { AdminLayout } from "../component/layouts/AdminLayout";
import { Settings } from "../pages/user/Settings";
import EditProfile from "../component/user/EditProfile";

export default function AdminRoutes() {
    return (

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>

            <Route element={<AdminLayout />}>
                <Route path="/overview" element={<AdminDashboard />} />
                <Route path="/admin/edit-profile" element={<EditProfile />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/users/profile/:id" element={<AdminUserProfile />} />
                <Route path="/payments" element={<AdminPayments />} />
            </Route>

            <Route path="/users" element={<AdminUsers />} />
            <Route path="/trips" element={<AdminTrips />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/trips/edit/:id" element={<AdminEditTrip />} />
            <Route path="/trip-form" element={<TripForm />} />

        </Route>
    );
}

// export default function AdminRoutes() {
//     return (
//         <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>

//             <Route element={<AdminLayout />}>

//                 {/* Dashboard */}
//                 <Route path="/overview" element={<AdminDashboard />} />

//                 {/* Settings & Profile */}
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="/edit-profile" element={<EditProfile />} />

//                 {/* Other Admin Pages */}
//                 <Route path="/users" element={<AdminUsers />} />
//                 <Route path="/trips" element={<AdminTrips />} />
//                 <Route path="/payments" element={<AdminPayments />} />
//                 <Route path="/reviews" element={<AdminReviews />} />
//                 <Route path="/messages" element={<AdminMessages />} />

//                 <Route path="/users/profile/:id" element={<AdminUserProfile />} />
//                 <Route path="/trips/edit/:id" element={<AdminEditTrip />} />
//                 <Route path="/trip-form" element={<TripForm />} />

//             </Route>

//         </Route>
//     );
// }