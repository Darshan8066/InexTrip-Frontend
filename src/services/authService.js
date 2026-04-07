// services/authService.js
import { setAuth, removeAuth } from "../utils/auth";
import axios from "./axios";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extracts a clean error message from any Axios or JS error.
 * Handles: network down, server 4xx/5xx, unknown errors.
 */
// const parseError = (error) => {
//     // Backend is down / no internet
//     if (error.code === "ERR_NETWORK" || error.code === "ERR_CONNECTION_REFUSED") {
//         return "Unable to reach server. Please check your connection.";
//     }
//     // Server responded with a structured error message
//     if (error?.response?.data?.message) {
//         return error.response.data.message;
//     }
//     // Fallback
//     return error?.message || "Something went wrong. Please try again.";
// };

// ─── Auth ────────────────────────────────────────────────────────────────────

// export const login = async (data) => {
//     try {
//         const res = await axios.post("/user/login", data);
//         setAuth(res.data.token);
//         return res.data;
//     } catch (error) {
//         throw new Error(parseError(error)); // ✅ always a clean string
//     }
// };

export const login = async (data) => {
    try {
        const res = await axios.post("/user/login", data);
        setAuth(res.data.token);
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const signup = async (data) => {
    try {
        const res = await axios.post("/user/register", data);
        setAuth(res.data.token);
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const logout = () => {
    removeAuth(); // ✅ clear token on logout
};

// ─── User ────────────────────────────────────────────────────────────────────

export const fetchUser = async () => {
    try {
        const res = await axios.get("/user/get");
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const fetchUserById = async () => {
    try {
        const res = await axios.get("/user/getUser");
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const updateProfile = async (data) => {
    try {
        const res = await axios.put("/user/update", data);
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const updateUser = async (data) => {
    try {
        const res = await axios.put("/user/update", data);
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

export const deleteUserbyId = async (id) => {
    try {
        console.log("deleteUserbyId : ", id)
        const res = await axios.delete(`/user/delete/${id}`);
        console.log("response delete", res.data);
        return res.data;
    } catch (error) {
        throw new Error(error.customMessage); // 🔥 clean
    }
};

// import { setAuth } from "../utils/auth";
// import axios from "./axios";


// export const login = async (data) => {

//     try {
//         const res = await axios.post("/user/login", data)
//         setAuth(res.data.token);
//         console.log("login service api",res.data)
//         return res?.data;

//     } catch (error) {
//         console.log("Login Failed", error)
//         throw error;
//     }

// };

// export const signup = async (data) => {
//     try {
//         const res = await axios.post('/user/register', data);
//         setAuth(res.data.token);
//         return res.data;

//     } catch (error) {

//         // get backend message
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("Register Failed:", message);

//         throw new Error(message); // send real message to frontend
//     }
// };



// export const updateProfile = async (data) => {
//     try {
//         console.log("updateProfile:", data)
//         const res = await axios.put('/user/update', data);
//         return res.data;

//     } catch (error) {

//         // get backend message
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log(" Update Failed:", message);

//         throw new Error(message); // send real message to frontend
//     }
// };

// export const fetchUser = async () => {
//     try {
//         const res = await axios.get('/user/get');
//         // console.log("fetchUser : ", res.data);
//         return res.data;

//     } catch (error) {

//         // get backend message
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("User Not Found:", message);

//         throw new Error(message); // send real message to frontend
//     }
// };
// export const fetchUserById = async () => {
//     try {
//         const res = await axios.get("/user/getUser");

//         return res.data;

//     } catch (error) {
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("User Not Found:", message);

//         throw new Error(message); // send real message to frontend
//     }
// };

// export const deleteUserbyId = async (id) => {

//     try {

//         const res = await axios.delete(`/user/delete/${id}`);
//         return res.data;

//     } catch (error) {

//         console.log(error.message);
//         throw error;
//     }
// };