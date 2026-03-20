import { setAuth } from "../utils/auth";
import axios from "./axios";


export const login = async (data) => {

    try {
        const res = await axios.post("/user/login", data)
        setAuth(res.data.token);
        return res?.data;

    } catch (error) {
        console.log(" Login Failed", error)
        throw error;
    }

};

export const signup = async (data) => {
    try {
        const res = await axios.post('/user/register', data);
        setAuth(res.data.token);
        return res.data;

    } catch (error) {

        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("Register Failed:", message);

        throw new Error(message); // send real message to frontend
    }
};



export const updateProfile = async (data) => {
    try {
        console.log("updateProfile:", data)
        const res = await axios.put('/user/update', data);
        return res.data;

    } catch (error) {

        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log(" Update Failed:", message);

        throw new Error(message); // send real message to frontend
    }
};

export const fetchUser = async () => {
    try {
        const res = await axios.get('/user/get');
        // console.log("fetchUser : ", res.data);
        return res.data;

    } catch (error) {

        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("User Not Found:", message);

        throw new Error(message); // send real message to frontend
    }
};
export const fetchUserById = async () => {
    try {
        const res = await axios.get("/user/getUser");

        return res.data;

    } catch (error) {
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("User Not Found:", message);

        throw new Error(message); // send real message to frontend
    }
};

export const deleteUserbyId = async (id) => {

    try {

        const res = await axios.delete(`/user/delete/${id}`);
        return res.data;

    } catch (error) {

        console.log(error.message);
        throw error;
    }
};