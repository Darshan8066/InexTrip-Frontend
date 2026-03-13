// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);


   const fetchUser1 = async () => {
      try {
         const res = await fetchUserById();
         setUser(res?.user);
      } catch (err) {
         console.log("User not logged in", err);
      }
   };

   useEffect(() => {
      fetchUser1();
   }, []);


   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
