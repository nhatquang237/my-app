import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
    const location = useLocation();
    const {setAuth} = useAuth();

    setAuth({"token": null})
    sessionStorage.removeItem("token");

    return (<Navigate to="/login" state={{ from: location }} replace />);
}
export default Logout;
