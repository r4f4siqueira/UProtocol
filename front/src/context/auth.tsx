import React, { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        firebase.auth().languageCode = "pt";
        // @ts-ignore
        const userStorage = JSON.parse(localStorage.getItem("@UProtocolUser"));
        if (userStorage) {
            setUser(userStorage);
            setSigned(true);
            // no react strict mode o toast é mandado duas vezes, mas no modo de produção irá ficar normal
            toast.success("Bem vindo " + userStorage.name + "!");
            // console.log("login");
        }
        setLoading(false);
    }, []);

    /**
     * registra o usuário no firebase authenticator
     * @param   {object} data  Dados do usuario a serem registrados
     */
    async function register(data: { name: string; email: string; password: string }) {
        setLoadAuth(true);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (response) => {
                await firebase
                    .firestore()
                    .collection("usuarios")
                    .doc(response.user?.uid)
                    .set({ name: data.name, avatar: null, email: response.user?.email })
                    .then(() => {
                        let userData = { uid: response.user?.uid, name: data.name, email: response.user?.email, avatar: null };
                        handleUser(userData, true);
                        setLoadAuth(false);
                    })
                    .catch((error) => {
                        console.log("Erro ao salvar usuario firestore: " + error);
                        toast.error(error);
                        setLoadAuth(false);
                    });
            })
            .catch((error) => {
                console.log("Erro ao criar conta firebase auth: " + error);
                toast.error(error);
                setLoadAuth(false);
            });
    }
    // infelizmente a documentacao fica disponivel acessar dentro do documento mas a partir do momento que
    // é importado pelo useContext dentro de outro documento a mesma não aparece

    /**
     * Loga o usuário com o firebase auth
     * @param   {object} userData  Dados do usuario para logar
     * @param   {object} isGoogle  true ou false se o login será feito com o google
     */
    async function login(userData: { email: string; password: string } | null, isGoogle: boolean) {
        setLoadAuth(true);

        if (!isGoogle) {
            if (userData) {
                // verificando email:

                await firebase
                    .auth()
                    .signInWithEmailAndPassword(userData.email, userData.password)
                    .then(async (response) => {
                        const firebaseUser = await firebase
                            .firestore()
                            .collection("usuarios")
                            .doc(response.user?.uid)
                            .get()
                            .catch((err) => console.log("erro ao buscar o usuario firebase auth:" + err));
                        const userData = { uid: response.user?.uid, name: firebaseUser?.data()?.name, email: response.user?.email, avatar: firebaseUser?.data()?.avatar };
                        handleUser(userData, true);
                        setLoadAuth(false);
                    })
                    .catch((error) => {
                        handleUser(null, false);
                        setLoadAuth(false);
                        switch (error.code) {
                            case "auth/user-not-found":
                                toast.error("Usuário não encontrado ou inexistente");
                                break;
                            case "auth/wrong-password":
                                toast.error("Senha inválida");
                                break;
                            default:
                                toast.error(error);
                                console.log(error.code);
                                break;
                        }
                    });
            }
        } else {
            const provider = new GoogleAuthProvider();
            await firebase
                .auth()
                .signInWithPopup(provider)
                .then(async (response) => {
                    const firebaseUser = await firebase.firestore().collection("usuarios").doc(response.user?.uid).get();
                    if (firebaseUser.exists) {
                        // const avatar = firebaseUser.data()?.avatar !== null ? firebaseUser.data()?.avatarUrl : response.user?.photoURL;
                        // se o usuário existe no firestore
                        if (firebaseUser.data()?.avatar === null) {
                            // se o usuário não possui uma foto salva no firestore, ele salva com o avatar do google
                            const avatar = response.user?.photoURL;
                            await firebase
                                .firestore()
                                .collection("usuarios")
                                .doc(response.user?.uid)
                                .update({ avatar })
                                .then(async () => {
                                    const snapshot = await firebase.firestore().collection("usuarios").doc(response.user?.uid).get();
                                    const userData = {
                                        uid: response.user?.uid,
                                        name: snapshot.data()?.name,
                                        email: snapshot.data()?.email,
                                        avatar: snapshot.data()?.avatar,
                                    };
                                    handleUser(userData, true);
                                    setLoadAuth(false);
                                })
                                .catch((err) => {
                                    console.log("erro ao atualizar avatar: " + err);
                                    handleUser(null, false);
                                    setLoadAuth(false);
                                });
                        } else {
                            //se o usuário possui avatar no firebase
                            await firebase
                                .firestore()
                                .collection("usuarios")
                                .doc(response.user?.uid)
                                .get()
                                .then((snapshot) => {
                                    const userData = {
                                        uid: response.user?.uid,
                                        name: snapshot.data()?.name,
                                        email: snapshot.data()?.email,
                                        avatar: snapshot.data()?.avatar,
                                    };
                                    handleUser(userData, true);
                                    setLoadAuth(false);
                                })
                                .catch((err) => {
                                    console.log("erro ao pegar dados do usuario: " + err);
                                    handleUser(null, false);
                                    setLoadAuth(false);
                                });
                        }
                    } else {
                        //se o usuário ainda não existe no firestore
                        const userFirebase = { name: response.user?.displayName, email: response.user?.email, avatar: response.user?.photoURL };
                        const userData = { ...userFirebase, uid: response.user?.uid };
                        await firebase
                            .firestore()
                            .collection("usuarios")
                            .doc(response.user?.uid)
                            .set(userFirebase)
                            .then(() => {
                                handleUser(userData, true);
                                setLoadAuth(false);
                            })
                            .catch((err) => {
                                toast.error("erro ao salvar usuario google novo firestore: " + err);
                                handleUser(null, false);
                                setLoadAuth(false);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Algo deu errado 😥");
                    setLoadAuth(false);
                    // setErro(true);
                });
        }
    }

    async function logout() {
        firebase.auth().signOut();
        handleUser(null, false);
    }

    //
    /**
     * lida com as operacoes do usuario no sistema
     * @param   {object | null} userData  Dados do usuario, se passado null, nenhuma operacao além da de remover será executada
     * @param   {boolean} op  Operação a realizar: false - remover usuario do LS e contexts   ------- true - adicionar usuario no LS e contexts
     */
    function handleUser(userData: { uid; name; email; avatar } | null, op: boolean) {
        switch (op) {
            case false:
                localStorage.removeItem("@UProtocolUser");
                setUser({});
                setSigned(false);
                break;
            case true:
                if (userData) {
                    localStorage.setItem("@UProtocolUser", JSON.stringify(userData));
                    if (userData.avatar === null) {
                        userData.avatar = require("../assets/placeholder.png");
                    }
                    setUser(userData);
                    setSigned(true);
                    console.log(userData);

                    toast.success("Bem vindo " + userData.name + "!");
                } else {
                    toast.error("tentando salvar usuario vazio ou nulo");
                }
                break;
            // case undefined:
            //     console.log("caso 2");
            //     break;
            default:
                console.log("op invalida");
                break;
        }
    }

    async function forgotPassword(email) {
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                toast.success("Email de verificação enviado! cheque sua caixa de entrada");
            })
            .catch((err) => {
                toast.error("Ocorreu um erro ao enviar o email");
                console.log(err.code);
                console.log(err);
            });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                handleUser,
                signed,
                login,
                logout,
                register,
                forgotPassword,
                loading,
                loadAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
