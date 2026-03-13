// utils/auth.js

import { useAuth } from "../context/AuthContext";

// Save login data
export const setAuth = (token) => {
    sessionStorage.setItem("token", token);
};


// Get logged in user
export const getUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
// Get token
export const getToken = () => {
    return sessionStorage.getItem("token");
};

// Clear auth (logout)
export const clearAuth = () => {
    // const { setUser } = useAuth();
    sessionStorage.removeItem("token");
    // setUser(null);
};
