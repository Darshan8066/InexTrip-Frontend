// import axios from "axios";

import axios from "./axios";

export const fetchTrip = async () => {
    try {
        const res = await axios.get('/trip/get');
        console.log("fetchTrip :",res)
        return res.data;

    } catch (error) {
        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("Trip not found:", message);

        throw new Error(message); // send real message to frontend
    }
};

export const fetchTripById = async (id) => {
    try {
        const res = await axios.get(`/trip/get/${id}`);
        return res.data;

    } catch (error) {

        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("Trip not found:", message);

        throw new Error(message); // send real message to frontend
    }

};

export const createTrip = async (tripData) => {
    try {
        const res = await axios.post(`/trip/create`, tripData);
        return res.data;

    } catch (error) {

        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("Create Trip Error:", message);

        throw new Error(message);
    }
};

export const deleteTrip = async (id) => {
    try {
        const res = await axios.delete(`/trip/delete/${id}`);
        return res.data;
    } catch (error) {
        const message =
            error.response?.data?.message || "Failed to delete trip";
        throw new Error(message);
    }
};