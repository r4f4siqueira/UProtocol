//react
import React, { useContext, useState } from "react";

//components
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/auth.tsx";

//styles
import { ContainerCenter } from "../../styles/styles";
import Logo from "../../assets/logo/logo.png";
import { BtLogin, LoginWrapper, BtGLogin, LinkRegister } from "../Login/styles";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const [touched, setTouched] = useState({ name: false, email: false, password: false, repPassword: false });

    const { register, login } = useContext(AuthContext);

    function handleBlur(field) {
        if (!touched[`${field}`] === true) {
            setTouched({ ...touched, [field]: true });
        }
    }

    /**
     * verifica algumas condicões para validar o que foi digitado
     * @param {string} tname nome completo do usuario
     * @param {string} temail email do usuario
     * @param {string} tsenha senha do usuario
     * @param {string} trepPassword senha do campo repita a senha
     * @return {fieldValidation} objeto contendo erros e mensagem de erros dos campos
     */
    function validate(tname, temail, tpassword, trepPassword) {
        const fieldValidation = {
            name: { err: null, msg: [""] },
            email: { err: null, msg: [""] },
            password: { err: null, msg: [""] },
            repPassword: { err: null, msg: [""] },
        };

        let ver = true;
        let msgName = ["Erros encontrados: "];
        let msgEmail = ["Erros encontrados: "];
        let msgPass = ["Erros encontrados: "];
        let msgRepPass = ["Erros encontrados: "];

        // REX (regular expression) para email, valida se está algo entre teste@teste.com
        // eslint-disable-next-line
        const emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // REX para nome, valida se não contém alguns caracteres especiais, números, etc
        const nameREX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        // REX para senha, valida se não possui mais de 20 caracteres, e não possui nenhum caractere especial relacionado a programacao, como $
        const passwordREX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        //verificacoes de senha:

        // lança um erro se a senha for menor que 6 digitos
        if (tpassword.length < 6) {
            ver = false;
            msgPass.push("A senha deve possuir mais de 6 caracteres");
            fieldValidation.password.err = false;
        }

        // lança um erro se a senha for menor que 6 digitos
        if (trepPassword.length < 6) {
            ver = false;
            msgRepPass.push("A senha deve possuir mais de 6 caracteres");
            fieldValidation.repPassword.err = false;
        }

        // lança um erro aos 2 campos se as senhas não coincidirem
        if (tpassword !== trepPassword) {
            ver = false;
            msgPass.push("As senhas devem ser iguais!");
            msgRepPass.push("As senhas devem ser iguais!");
            fieldValidation.password.err = false;
            fieldValidation.repPassword.err = false;
        }

        // lança um erro se a senha não coincidir com o REX, também verifica se a mesma está vazia
        if (!tpassword.match(passwordREX)) {
            ver = false;
            fieldValidation.password.err = false;
            if (tpassword === "") {
                msgPass.push("A senha não pode estar vazia");
            } else {
                msgPass.push("A senha deve possuir pelo menos uma letra e um número");
            }
        }

        // verificações de email

        // lança um erro se o erro não possuir @
        if (!temail.includes("@")) {
            ver = false;
            msgEmail.push("O Email deve possuir @");
            fieldValidation.email.err = false;
        }

        // lança um erro se o email não possuir ponto final
        if (!temail.includes(".")) {
            ver = false;
            msgEmail.push("O Email deve possuir ponto final (.)");
            fieldValidation.email.err = false;
        }

        // lança um erro se o email não coincidir com a expressao regular
        if (!temail.match(emailREX)) {
            ver = false;
            fieldValidation.email.err = false;
            if (temail === "") {
                msgEmail.push("O Email não pode estar vazio");
            } else {
                msgEmail.push("O Email não possui formato válido");
            }
        }

        //verificações de nome

        // lança um erro se o nome nao coincidir com a expressao regular, também verifica se o mesmo está fazio para enviar uma mensagem diferente
        if (!tname.match(nameREX)) {
            ver = false;
            fieldValidation.name.err = false;
            if (tname === "") {
                msgName.push("O Nome não pode estar vazio");
            } else {
                if (tname.length < 3) {
                    msgName.push("O Nome deve possuir mais de 3 caracteres");
                } else {
                    msgName.push("O Nome possui caracteres inválidos");
                }
            }
        }

        // fim das verificações

        // se até essa parte da funcao o campo err não foi marcado como false, ele será marcado como true
        // para indicar que o que foi digitado está correto

        if (fieldValidation.name.err !== false) {
            fieldValidation.name.err = true;
        }

        if (fieldValidation.email.err !== false) {
            fieldValidation.email.err = true;
        }

        if (fieldValidation.password.err !== false) {
            fieldValidation.password.err = true;
        }

        if (fieldValidation.repPassword.err !== false) {
            fieldValidation.repPassword.err = true;
        }

        // se existir erros, vai setar o vetor de erros na const fieldvalidation
        if (!ver) {
            fieldValidation.name.msg = msgName;
            fieldValidation.email.msg = msgEmail;
            fieldValidation.password.msg = msgPass;
            fieldValidation.repPassword.msg = msgRepPass;
        }

        return fieldValidation;
    }

    // retorna true ou false se o formulario pode ser enviado
    function canBeSubmitted() {
        const errors = validate(name, email, password, repPassword);
        const isDisabled = Object.keys(errors).some((x) => !errors[`${x}`].err);
        return !isDisabled;
    }

    //funcao executada ao submitar o formulário, ela para a execucao antes caso a funcao canbesubmitted retorne false
    function handleSubmit(e) {
        e.preventDefault();
        if (!canBeSubmitted()) {
            return;
        }
        const userData = { name: name, email: email, password: password };
        register(userData);
        // alert("bomdia");
    }

    // toda vez que a tela renderizar essa constante irá receber o resultado da funcao validate, indicando qual campo possui erro e suas mensagens
    // isDisabled verifica se existe pelo menos um erro no campo err de errors.
    const errors = validate(name, email, password, repPassword);
    const isDisabled = Object.keys(errors).some((x) => !errors[`${x}`].err);

    // retorna true, false ou null dependendo se possui erro e se deve mostrar o erro
    // se nao deve mostrar retorna null, que é utilizado no isvalid do input como o input normal
    // os outros casos sao true ou false, que sao invertidos para marcar se possui ou nao erros
    const shouldMarkError = (field) => {
        const hasError = !errors[`${field}`].err;
        const shouldShow = touched[field];
        if (!shouldShow) {
            return null;
        }
        return hasError ? shouldShow : false;
    };

    function handleGoogleLogin() {
        login(null, true);
    }
    // console.log("render");
    return (
        <ContainerCenter>
            <LoginWrapper>
                <img alt="logotipo da empresa" src={Logo} />
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome Completo: "
                        placeholder="Uprotocol da Silva"
                        type="text"
                        inputValue={name}
                        errMsg={errors.name.msg}
                        isValid={shouldMarkError("name") ? false : shouldMarkError("name") === null ? null : true} /* false - erro, null - nada, true - correto */
                        ocHandler={(e) => {
                            setName(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("name");
                        }}
                    />
                    <Input
                        label="Email: "
                        placeholder="Uprotocolsilva@uprotocol.com"
                        type="email"
                        inputValue={email}
                        errMsg={errors.email.msg}
                        isValid={shouldMarkError("email") ? false : shouldMarkError("email") === null ? null : true} /* false - erro, null - nada, true - correto */
                        ocHandler={(e) => {
                            setEmail(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("email");
                        }}
                    />
                    <Input
                        label="Senha: "
                        placeholder="uprotocol@123"
                        type="password"
                        inputValue={password}
                        errMsg={errors.password.msg}
                        isValid={shouldMarkError("password") ? false : shouldMarkError("password") === null ? null : true} /* false - erro, null - nada, true - correto */
                        ocHandler={(e) => {
                            setPassword(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("password");
                        }}
                    />
                    <Input
                        label="Repita a Senha: "
                        placeholder="uprotocol@123"
                        type="password"
                        inputValue={repPassword}
                        errMsg={errors.repPassword.msg}
                        isValid={
                            shouldMarkError("repPassword") ? false : shouldMarkError("repPassword") === null ? null : true
                        } /* false - erro, null - nada, true - correto */
                        ocHandler={(e) => {
                            setRepPassword(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("repPassword");
                        }}
                    />
                    <BtLogin disabled={isDisabled} type="submit">
                        Cadastrar
                    </BtLogin>
                </form>
                <BtGLogin onClick={handleGoogleLogin}>Entrar com Google</BtGLogin>
                <LinkRegister to="/">Já tenho uma conta</LinkRegister>
            </LoginWrapper>
        </ContainerCenter>
    );
}

export default Register;
