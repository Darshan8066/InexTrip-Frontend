// // context/AuthContext.jsx

// import { createContext, useContext, useState, useEffect } from "react";
// import { fetchUserById } from "../services/authService";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//    const [user, setUser] = useState(null);
//    const [loadingUser, setLoadingUser] = useState(true);

//    const fetchUser1 = async () => {
//       //    try {
//       //       setLoadingUser(true)
//       //       const res = await fetchUserById();
//       //       setUser(res?.user);
//       //    } catch (err) {
//       //       console.log("User not logged in", err);
//       //       setUser(null);
//       //    } finally {
//       //       setLoadingUser(false);
//       //    }
//       // };

//       const fetchUser1 = async () => {
//          try {
//             const token = localStorage.getItem("token");

//             // 🚫 STOP if no token
//             if (!token) {
//                setUser(null);
//                return;
//             }

//             setLoadingUser(true);

//             const res = await fetchUserById();

//             setUser(res?.user);
//          } catch (err) {
//             console.log("User not logged in");
//             setUser(null); // ✅ prevent crash
//          } finally {
//             setLoadingUser(false);
//          }
//       };

//       useEffect(() => {
//          fetchUser1();
//       }, []);


//       return (
//          <AuthContext.Provider value={{ user, setUser, loadingUser, refetch: fetchUser1 }}>
//             {children}
//          </AuthContext.Provider>
//       );
//    };

//    export const useAuth = () => useContext(AuthContext);


// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loadingUser, setLoadingUser] = useState(true);

   const fetchUser1 = async () => {
      try {
         const token = sessionStorage.getItem("token");

         // 🚫 STOP if no token
         if (!token) {
            setUser(null);
            setLoadingUser(false);
            return;
         }

         setLoadingUser(true);

         const res = await fetchUserById();
         setUser(res?.user);

      } catch (err) {
         console.log("User not logged in");
         setUser(null);
      } finally {
         setLoadingUser(false);
      }
   };

   // ✅ ADD THIS 🔥
   const logout = () => {
      sessionStorage.removeItem("token"); // remove token
      setUser(null);                      // clear user
   };

   // ✅ THIS MUST BE OUTSIDE FUNCTION
   useEffect(() => {
      fetchUser1();
   }, []);

   return (
      <AuthContext.Provider value={{ user, setUser, loadingUser, logout, refetch: fetchUser1 }}>
         {children}
      </AuthContext.Provider>
   );
};

// ✅ ALSO OUTSIDE
export const useAuth = () => useContext(AuthContext);