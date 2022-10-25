import React, { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';
import api from '../services/backendAPI';
// @ts-ignore
import { getCompany } from '../store/actions/company.tsx';
import { useDispatch } from 'react-redux';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        //Quando abre o programa tenta pegar o usuário guardado no storage para logar automaticamente
        firebase.auth().languageCode = 'pt';
        setLoading(true);
        // passando ts ignore porque preciso que a variavel userstorage seja null ou json
        // @ts-ignore
        const userStorage = JSON.parse(localStorage.getItem('@UProtocolUser'));
        if (userStorage) {
            // caso exista um usuario no local storage, irá realizar o processo de colocar no sistema
            if (userStorage.avatar === null) {
                // se o usuario nao tiver avatar ele recebe um placeholder
                userStorage.avatar = require('../assets/placeholder.png');
            }
            setUser(userStorage);
            setSigned(true);
            // no react strict mode o toast é mandado duas vezes, mas no modo de produção irá ficar normal
            if (Object.keys(user).length > 0) {
                toast.success('Bem vindo ' + userStorage.name + '!');
            }
            // console.log("login");
        }
        setLoading(false);
        // eslint-disable-next-line
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
                // após criar o usuário no auth, coloca seus dados no firestore
                await firebase
                    .firestore()
                    .collection('usuarios')
                    .doc(response.user?.uid)
                    .set({ name: data.name, avatar: null, email: response.user?.email, active: true })
                    .then(() => {
                        // depois de salvar no firestore, salva no sistema o usuario atual
                        let userData = { uid: response.user?.uid, name: data.name, email: response.user?.email, avatar: null, active: true };
                        handleUser(userData, true, false);
                        setLoadAuth(false);
                    })
                    .catch((error) => {
                        console.log('Erro ao salvar usuario firestore: ' + error);
                        toast.error(error);
                        setLoadAuth(false);
                    });
            })
            .catch((error) => {
                // Sobreescrevendo alguns codigos comuns de erro
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('Email informado já está em uso');
                        break;
                    default:
                        toast.error(error);
                        console.log(error.code);
                        break;
                }
                setLoadAuth(false);
            });
    }
    // infelizmente a documentacao fica disponivel acessar dentro do documento mas a partir do momento que
    // é importado pelo useContext dentro de outro arquivo a mesma não aparece junto

    /**
     * Loga o usuário com o firebase auth
     * @param   {object} userData  Dados do usuario para logar
     * @param   {object} isGoogle  true ou false se o login será feito com o google
     */
    async function login(userData: { email: string; password: string } | null, isGoogle: boolean) {
        setLoadAuth(true);
        if (!isGoogle) {
            //se for login sem google, com email e senha
            if (userData) {
                //se existir o obj userdata, loga com os dados da conta
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(userData.email, userData.password)
                    .then(async (response) => {
                        //após logar, pega os dados no firestore
                        const firebaseUser = await firebase
                            .firestore()
                            .collection('usuarios')
                            .doc(response.user?.uid)
                            .get()
                            .catch((err) => console.log('erro ao buscar o usuario firebase auth:' + err));

                        const userData = {
                            uid: response.user?.uid,
                            name: firebaseUser?.data()?.name,
                            email: response.user?.email,
                            avatar: firebaseUser?.data()?.avatar,
                            active: firebaseUser?.data()?.active,
                        };
                        handleUser(userData, true, false);
                        setLoadAuth(false);
                    })
                    .catch((error) => {
                        handleUser(null, false, false);
                        setLoadAuth(false);
                        // sobrescrevendo erros comuns
                        switch (error.code) {
                            case 'auth/user-not-found':
                                toast.error('Usuário não encontrado ou inexistente');
                                break;
                            case 'auth/wrong-password':
                                toast.error('Senha inválida');
                                break;
                            case 'auth/too-many-requests':
                                toast.error('Muitas tentativas falhas, aguarde alguns segundos');
                                break;
                            default:
                                toast.error(error);
                                console.log(error.code);
                                break;
                        }
                    });
            }
        } else {
            // se for login com o google
            const provider = new GoogleAuthProvider();
            await firebase
                .auth()
                .signInWithPopup(provider)
                .then(async (response) => {
                    // após login com o google, busca o usuario no firestore
                    const firebaseUser = await firebase.firestore().collection('usuarios').doc(response.user?.uid).get();
                    if (firebaseUser.exists) {
                        // const avatar = firebaseUser.data()?.avatar !== null ? firebaseUser.data()?.avatarUrl : response.user?.photoURL;
                        // se o usuário existe no firestore
                        if (firebaseUser.data()?.avatar === null) {
                            // se o usuário não possui uma foto salva no firestore, ele salva com o avatar do google
                            const avatar = response.user?.photoURL;
                            await firebase
                                .firestore()
                                .collection('usuarios')
                                .doc(response.user?.uid)
                                .update({ avatar })
                                .then(async () => {
                                    // após atualizar o avatar, pega os dados atualizados do usuario no firestore
                                    const snapshot = await firebase.firestore().collection('usuarios').doc(response.user?.uid).get();
                                    const userData = {
                                        uid: response.user?.uid,
                                        name: snapshot.data()?.name,
                                        email: snapshot.data()?.email,
                                        avatar: snapshot.data()?.avatar,
                                        active: snapshot.data()?.active,
                                    };
                                    handleUser(userData, true, false);
                                    setLoadAuth(false);
                                })
                                .catch((err) => {
                                    console.log('erro ao atualizar avatar: ' + err);
                                    handleUser(null, false, false);
                                    setLoadAuth(false);
                                });
                        } else {
                            //se o usuário possui avatar no firebase
                            await firebase
                                .firestore()
                                .collection('usuarios')
                                .doc(response.user?.uid)
                                .get()
                                .then((snapshot) => {
                                    const userData = {
                                        uid: response.user?.uid,
                                        name: snapshot.data()?.name,
                                        email: snapshot.data()?.email,
                                        avatar: snapshot.data()?.avatar,
                                        active: snapshot.data()?.active,
                                    };
                                    handleUser(userData, true, false);
                                    setLoadAuth(false);
                                })
                                .catch((err) => {
                                    console.log('erro ao pegar dados do usuario: ' + err);
                                    handleUser(null, false, false);
                                    setLoadAuth(false);
                                });
                        }
                    } else {
                        //se o usuário ainda não existe no firestore
                        const userFirebase = { name: response.user?.displayName, email: response.user?.email, avatar: response.user?.photoURL, active: true };
                        const userData = { ...userFirebase, uid: response.user?.uid };
                        await firebase
                            .firestore()
                            .collection('usuarios')
                            .doc(response.user?.uid)
                            .set(userFirebase)
                            .then(() => {
                                handleUser(userData, true, false);
                                setLoadAuth(false);
                            })
                            .catch((err) => {
                                toast.error('erro ao salvar usuario google novo firestore: ' + err);
                                handleUser(null, false, false);
                                setLoadAuth(false);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.code);
                    toast.error('Algo deu errado 😥');
                    setLoadAuth(false);
                    // setErro(true);
                });
        }
    }

    async function logout() {
        //desloga do sistema
        firebase.auth().signOut();
        handleUser(null, false, false);
    }

    //
    /**
     * lida com as operacoes do usuario no sistema
     * @param   {object | null} userData  Dados do usuario, se passado null, nenhuma operacao além da de remover será executada
     * @param   {boolean} op  Operação a realizar: false - remover usuario do LS e contexts   ------- true - adicionar usuario no LS e contexts
     * @param   {boolean} isEdit Se é uma operação de edição do usuário ou não, somente muda a mensagem do toast
     */
    function handleUser(userData: { uid; name; email; avatar; active } | null, op: boolean, isEdit: boolean) {
        switch (op) {
            case false:
                //remover usuario do LS e do sistema
                localStorage.removeItem('@UProtocolUser');
                setUser({});
                setSigned(false);
                break;
            case true:
                // adicionar usuario no LS e sistema
                if (userData) {
                    // se existir o obj userdata, sem essa verificacao o typescript reclama la embaixo
                    localStorage.setItem('@UProtocolUser', JSON.stringify(userData));
                    if (userData.avatar === null) {
                        // se nao possuir avatar, recebe um placeholder
                        userData.avatar = require('../assets/placeholder.png');
                    }
                    setUser(userData);
                    setSigned(true);
                    // console.log(userData);
                    // se for uma atualizacao de usuário, ex: perfil.
                    if (isEdit) {
                        toast.success('Salvo com sucesso!');
                    } else {
                        const data = new FormData();
                        data.append('ativo', '1');
                        data.append('nome', userData.name);
                        data.append('email', userData.email);
                        data.append('uid', userData.uid);
                        data.append('avatarURL', userData.avatar);
                        api.post('/funcionario', data)
                            .then((resp) => {
                                // console.log(resp);
                                dispatch(getCompany(userData.uid));
                            })
                            .catch((err) => {
                                if (err.code !== 'ERR_BAD_RESPONSE') {
                                    console.log(err);
                                }
                                console.log(err);
                            });

                        toast.success('Bem vindo ' + userData.name + '!');
                    }
                } else {
                    toast.error('tentando salvar usuario vazio ou nulo');
                }
                break;
            // case undefined:
            //     console.log("caso 2");
            //     break;
            default:
                console.log('op invalida');
                break;
        }
    }

    async function forgotPassword(email) {
        // envia um email para a inbox do usuario para alterar sua senha
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                toast.success('Email de verificação enviado! cheque sua caixa de entrada');
            })
            .catch((err) => {
                toast.error('Ocorreu um erro ao enviar o email');
                console.log(err.code);
                console.log(err);
            });
    }

    /**
     * lida com as operacoes do usuario no sistema
     * @param   {boolean} op  Operação a realizar: false - desativar conta   ------- true - ativar conta desativada
     * @param   {boolean} uid  UID do usuario
     */
    async function manageAccount(op: boolean, uid) {
        // muda o estado da conta como ativa ou inativa dependendo de OP
        firebase
            .firestore()
            .collection('usuarios')
            .doc(uid)
            .update({ active: op })
            .then(() => {
                if (!op) {
                    logout();
                    toast.info('Conta desativada');
                } else {
                    toast.info('Conta reativada com sucesso!');
                }
            })
            .catch((err) => {
                toast.error('Ocorreu um erro ao gerenciar conta');
                console.log(err.code);
                console.log(err);
            })
            .finally(() => {
                //atualiza o usuario no sistema idependente do que aconteceu
                //@ts-ignore
                handleUser({ ...user, active: op }, true);
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
                manageAccount,
                loading,
                loadAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
