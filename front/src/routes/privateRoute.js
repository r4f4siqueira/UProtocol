import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.tsx";
import DUser from "../pages/DUser/DUser";
import Loading from "../pages/Loading/Loading.js";

function RouteWrapper({ children }) {
    const { signed, loading, user } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    // console.log(signed);
    if (children.type.name === "Login" || children.type.name === "Register") {
        return signed ? <Navigate to="/dashboard" /> : children;
    } else {
        if (children.type.name === "DUser") {
            return signed ? !user.active ? children : <Navigate to="/" /> : <Navigate to="/" />;
        }
        return signed ? user.active ? children : <Navigate to="/inactiveAccount" /> : <Navigate to="/" />;
    }
}
export default RouteWrapper;
