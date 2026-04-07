import { Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import TripDetails from "../pages/user/TripDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import { Services } from "../pages/public/Services";

export default function PublicRoutes() {
    return (
        <>
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />

            {/* Trip View */}
            <Route path="/trip/:id" element={<TripDetails />} />

            {/* Auth */}
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </>
    );
}