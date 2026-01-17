import AppContext from "./AppContext";
import { useState, useEffect } from "react";

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
<<<<<<< HEAD
    if (token) {
      // local storage ma token rakhni
=======
    // Sync token
    if (token) {
>>>>>>> af655c1682f91aba3012fbd034a0609064f9a01d
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

<<<<<<< HEAD
    if (user) {
      // local storage ma user detail rakhni
=======
    // Sync user
    if (user) {
>>>>>>> af655c1682f91aba3012fbd034a0609064f9a01d
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);
  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
