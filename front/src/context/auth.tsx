import React, { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {}, []);

    /**
     * registra o usuário no firebase authenticator
     * @param   {char} isGoogle  caso true faz o registro com o google caso false realiza o registo com email e senha
     * @param   {object} data  Dados do usuario a serem registrados
     */
    async function register(isGoogle: boolean, data: { email: string; password: string }) {
        console.log("bomdia");
    }
    //documentacao fica disponivel acessar dentro do documento mas a partir do momento que é importado pelo useContext fica indisponivel novamente

    async function login() {}

    async function logout() {}

    function saveStorage() {}

    return (
        <AuthContext.Provider
            value={{
                signed: false,
                register,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
