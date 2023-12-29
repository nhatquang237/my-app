import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotRequireAuth = () => {
  const { auth } = useAuth();

  if (!auth?.token){
    return (<Outlet />)
  }
}

export default NotRequireAuth;
