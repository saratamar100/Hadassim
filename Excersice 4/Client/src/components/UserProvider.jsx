import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const updateUser = (user) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user));
  };

  const updateToken = (token) => {
    setToken(token);
    Cookies.set("token", JSON.stringify(token));
  };

  return (
    <UserContext.Provider value={{ user, token, updateUser, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
