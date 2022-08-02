import React, { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {}, []);

    /**
     * registra o usuário pelo firebase auth
     * @param   {int} operacao  1: Registro com email e senha, 2: Registro com conta google
     * @param   {Object} dados  Dados do usuario a serem registrados
     */
    async function register(operacao, dados) {
        console.log("bomdia");
    }

    async function login() {}

    async function logout() {}

    function saveStorage() {}

    return (
        <AuthContext.Provider
            value={{
                signed: false,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
