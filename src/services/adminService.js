// export const fetchAdminStats = async () => {
//     try {
//         // const res = await axios.get('/api/admin/stats');
//         const totalUsers = 20;
//         const totalTrips = 60;
//         const totalRevenue = 500000;
//         // const totalRevenue = db.payments.reduce((sum, p) => sum + p.amount, 0);


//         // Mock monthly data
//         const monthlyRevenue = [
    //             { name: 'Jan', revenue: 4000 },
    //             { name: 'Feb', revenue: 3000 },
    //             { name: 'Mar', revenue: 2000 },
    //             { name: 'Apr', revenue: 2780 },
    //             { name: 'May', revenue: 1890 },
    //             { name: 'Jun', revenue: 2390 },
    //         ];

    //         const popularDestinations = [
        //             { city: 'Goa', percentage: 85 },
//             { city: 'Kyoto', percentage: 70 },
//             { city: 'Manali', percentage: 55 },
//             { city: 'Coorg', percentage: 40 },
//         ];

//         return ({
    //             totalUsers,
    //             totalTrips,
    //             totalRevenue,
    //             monthlyRevenue,
//             popularDestinations
//         });
//         // console.log("res:", res.data);
//         // return res.data;

//     } catch (error) {
    
//         const message =
//             error.response?.data?.message || "Something went wrong";

//         console.log("User Not Found:", message);

//         throw new Error(message); // send real message to frontend
//     }
// };



import axios from "./axios";

export const fetchAdminStats = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get("/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;

  } catch (error) {

    const message =
      error.response?.data?.message || "Something went wrong";

    throw new Error(message);
  }
};