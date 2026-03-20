import axios from "./axios";

// CREATE REVIEW
export const createReview = async (reviewData) => {
  try {
    const res = await axios.post("/review/create", reviewData);
    return res.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};


//GET ALL REVIEWS
export const fetchReview = async () => {
  try {
    const res = await axios.get("/review");
    return res.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const fetchReviewByTripId = async (tripId) => {
  try {
    const res = await axios.get(`/review/${tripId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};


//DELETE REVIEW
export const deleteReview = async (reviewId) => {
  try {

    const res = await axios.delete(`/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};