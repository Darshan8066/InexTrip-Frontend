import axios from "./axios";

// export const fetchTrip = async () => {
//   try {
//     const res = await axios.get("/trip/get");
//     return res.data;
//   } catch (error) {
//     const message = error.response?.data?.message || "Something went wrong";
//     console.error("fetchTrip error:", message); // FIX: console.error not console.log
//      throw new Error(error.customMessage); // 🔥 clean
//   }
// };
// Pass page + limit so the backend returns the correct slice
export const fetchTrip = async ({ page = 1, limit = 100 } = {}) => {
  try {
    const res = await axios.get(`/trip/get?page=${page}&limit=${limit}`);
    return res.data;
    // Returns: { success, trips, totalTrips, totalPages, currentPage, limit }
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("fetchTrip error:", message);
    throw new Error(error.customMessage); // 🔥 clean
  }
};


export const fetchTripById = async (id) => {
  try {
    const res = await axios.get(`/trip/get/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("fetchTripById error:", message);
    throw new Error(error.customMessage); // 🔥 clean
  }
};

export const createTrip = async (tripData) => {
  try {
    const res = await axios.post("/trip/create", tripData);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("createTrip error:", message);
    throw new Error(error.customMessage); // 🔥 clean
  }
};

export const updateTrip = async (id, tripData) => {
  // FIX: was missing entirely — needed for edit functionality
  try {
    console.log("userid :", id);
    console.log("user trip data :", tripData);
    
    const res = await axios.put(`/trip/update/${id}`, tripData);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update trip";
    console.error("updateTrip error:", message);
    throw new Error(error.customMessage); // 🔥 clean
  }
};

export const deleteTrip = async (id) => {
  try {
    const res = await axios.delete(`/trip/delete/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete trip";
    console.error("deleteTrip error:", message);
    throw new Error(error.customMessage); // 🔥 clean
  }
};

// // import axios from "axios";

// import axios from "./axios";

// export const fetchTrip = async () => {
//     try {
//         const res = await axios.get('/trip/get');
//         console.log("fetchTrip :",res)
//         return res.data;

//     } catch (error) {
//         // get backend message
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("Trip not found:", message);

//          throw new Error(error.customMessage); // 🔥 clean // send real message to frontend
//     }
// };

// export const fetchTripById = async (id) => {
//     try {
//         const res = await axios.get(`/trip/get/${id}`);
//         return res.data;

//     } catch (error) {

//         // get backend message
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("Trip not found:", message);

//          throw new Error(error.customMessage); // 🔥 clean // send real message to frontend
//     }

// };

// export const createTrip = async (tripData) => {
//     try {
//         const res = await axios.post(`/trip/create`, tripData);
//         return res.data;

//     } catch (error) {

//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("Create Trip Error:", message);

//          throw new Error(error.customMessage); // 🔥 clean
//     }
// };

// export const deleteTrip = async (id) => {
//     try {
//         const res = await axios.delete(`/trip/delete/${id}`);
//         return res.data;
//     } catch (error) {
//         const message =
//             error.response?.data?.message || "Failed to delete trip";
//          throw new Error(error.customMessage); // 🔥 clean
//     }
// };