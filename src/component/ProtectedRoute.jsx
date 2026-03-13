import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // console.log("inside try block");
    const decoded = jwtDecode(token);
    // console.log("decode ",decoded);

    //  CHECK TOKEN EXPIRY
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      sessionStorage.removeItem("token");
      console.log("ProtectedRoute", currentTime, decoded.exp);
      return <Navigate to="/login" replace />;
    }

    // Redirect to their respective dashboard if they try to access unauthorized areas
    if (!allowedRoles.includes(decoded.role)) {
      const defaultRedirect =
        decoded.role === "ADMIN"
          ? "/admin/dashboard"
          : "/user/dashboard";

      return <Navigate to={defaultRedirect} replace />;
    }

    return children;
  } catch (error) {
    sessionStorage.removeItem("token");
    console.log(error)
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;