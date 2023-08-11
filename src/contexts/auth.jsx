import React, { ReactNode, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";

const Authcontext = createContext({});
const AuthProvider = ({ children }) => {
  const isLogin = () => {
    return (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") === "YWRtaW4rY2hhbmdlYWRtaW4xMjM="
    );
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
