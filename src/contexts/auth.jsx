import React, { ReactNode, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";

const Authcontext = createContext({});
const AuthProvider = ({ children }) => {
  const isLogin = () => {
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token") !== null;
  };
  return (
    <Authcontext.Provider value={{ isLogin }}>
      <>{children}</>
    </Authcontext.Provider>
  );
};
const useAuth = () => {
  return useContext(Authcontext);
};
export { AuthProvider, useAuth, Authcontext };
