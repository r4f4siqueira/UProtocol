import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.tsx";
import Loading from "../pages/Loading/loading.js";

function RouteWrapper({ children }) {
    const { signed, loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />;
    }

    // console.log(signed);
    if (children.type.name === "Login" || children.type.name === "Register") {
        return signed ? <Navigate to="/dashboard" /> : children;
    } else {
        return signed ? children : <Navigate to="/" />;
    }
}
export default RouteWrapper;
