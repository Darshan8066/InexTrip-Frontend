// utils/auth.js

const TOKEN_KEY = "token";

// Save token after login/signup
export const setAuth = (token) => {
    if (token) {
        sessionStorage.setItem(TOKEN_KEY, token);
    }
};

// Get token (used in axios interceptor / API calls)
export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY) || null;
};

// Check if user is logged in
export const isAuthenticated = () => {
    return !!sessionStorage.getItem(TOKEN_KEY);
};

// Clear token on logout — alias kept for backward compatibility
export const clearAuth = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

// Same as clearAuth — used in authService.js logout()
export const removeAuth = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};
// ===================================
export const getUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
// // utils/auth.js

// import { useAuth } from "../context/AuthContext";

// // Save login data
// export const setAuth = (token) => {
//     sessionStorage.setItem("token", token);
// };


// // Get logged in user
// export const getUser = () => {
//     const user = sessionStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
// };
// // Get token
// export const getToken = () => {
//     return sessionStorage.getItem("token");
// };

// // Clear auth (logout)
// export const clearAuth = () => {
//     // const { setUser } = useAuth();
//     sessionStorage.removeItem("token");
//     // setUser(null);
// };
