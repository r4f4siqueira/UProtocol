import React, { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {}, []);

    async function register() {}

    async function login() {}

    async function logout() {}

    function saveStorage() {}

    return (
        <AuthContext.Provider
            value={{
                signed: false,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
