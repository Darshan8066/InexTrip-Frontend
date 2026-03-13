import axios from "axios";

const BASE_URl = import.meta.env.VITE_API_URL;
// console.log("baseURL ", BASE_URl);


const axiosInstance = axios.create({
    baseURL: BASE_URl,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');

        //if token exists,add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // remove data 
            sessionStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;
