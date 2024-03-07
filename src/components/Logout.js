import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useEffect } from 'react';

const Logout = () => {
  const location = useLocation();
  const { setAuth } = useAuth();

  useEffect(() => {
    // Remove existing token
    setAuth({ "token": null })
    sessionStorage.removeItem("token");
  }, []);

  return (<Navigate to="/login" state={{ from: location }} replace />);
}
export default Logout;
