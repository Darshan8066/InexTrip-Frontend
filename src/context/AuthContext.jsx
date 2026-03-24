// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loadingUser, setLoadingUser] = useState(true);

   const fetchUser1 = async () => {
      try {
         setLoadingUser(true)
         const res = await fetchUserById();
         setUser(res?.user);
      } catch (err) {
         console.log("User not logged in", err);

      } finally {
         setLoadingUser(false);
      }
   };

   useEffect(() => {
      fetchUser1();
   }, []);


   return (
      <AuthContext.Provider value={{ user, setUser, loadingUser, refetch: fetchUser1 }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
