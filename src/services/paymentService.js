import axios from "./axios";

export const fetchPayment = async () => {

    try {
        const res = await axios.get("/payments");
        console.log("fetchPayment : ",res.data)
        return res?.data;

    } catch (error) {
        console.log("payment data Failed", error)
        throw error;
    }

};