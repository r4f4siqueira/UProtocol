//react
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

//components
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/auth.tsx";
import { ReactComponent as Loading } from "../../assets/Loading/Gear.svg";

//styles
import { ContainerCenter, ContainerR } from "../../styles/styles";
import Logo from "../../assets/logo/logo.png";
import { BtLogin, LoginWrapper, LinkPassword, BtGLogin, LinkRegister } from "./styles";

// var canVerify = false;
function Login() {
    // const { register } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({ email: false, pass: false });

    const { login, forgotPassword, loadAuth } = useContext(AuthContext);
    // const [firstTime, setFirstTime] = useState({ email: true, senha: true });

    // seta de forma genérica o state touched que comeca como falso para true, de acordo com o parametro passado, utilizado com a prop blur do input
    function handleBlur(field) {
        // canVerify = true;
        // canSubmit(true);
        if (!touched[`${field}`] === true) {
            setTouched({ ...touched, [field]: true });
        }
    }

    /**
     * verifica algumas condicões para validar o que foi digitado
     * @param {string} temail email do usuario
     * @param {string} tsenha senha do usuario
     * @return {fieldValidation} objeto contendo erros e mensagem de erros dos campos
     */
    function validate(temail, tpassword) {
        // if (firstTime.email) {
        //     fieldValidation.email.err = null;
        //     setFirstTime({ ...firstTime, email: false });
        //     return false;
        // }
        // if (firstTime.senha) {
        //     fieldValidation.pass.err = null;
        //     setFirstTime({ ...firstTime, senha: false });
        //     return false;
        // }

        // if (!canVerify) {
        //     console.log("nao verificou");
        //     return false;
        // }

        // constante de validacao, indica se o campo possui um erro e a mensagem de erro que ele vai ter, as proximas verificacoes
        // são para verificar o email e a senha e empurrar uma mensagem referente ao erro
        const fieldValidation = {
            email: { err: null, msg: [""] },
            pass: { err: null, msg: [""] },
        };

        let ver = true;
        let msgEmail = ["Erros encontrados: "];
        let msgPass = ["Erros encontrados: "];

        //REX = Regular Expression, expressao regular para validacao de email, basicamente requer algo@algo.algo
        // eslint-disable-next-line
        const emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // console.log("function validate call");

        // lança um erro se a senha for menor que 6 digitos
        if (tpassword.length < 6) {
            ver = false;
            msgPass.push("A senha deve possuir mais de 6 caracteres");
            fieldValidation.pass.err = false;
        }

        // lança um erro se o erro não possuir @
        if (!temail.includes("@")) {
            ver = false;
            msgEmail.push("O Email deve possuir @");
            fieldValidation.email.err = false;
        }

        // lança um erro se o email não possuir nenhum ponto
        if (!temail.includes(".")) {
            ver = false;
            msgEmail.push("O Email deve possuir ponto final (.)");
            fieldValidation.email.err = false;
        }

        // lança um erro se o email não coincidir com a expressao regular
        if (!temail.match(emailREX)) {
            ver = false;
            msgEmail.push("O Email não possui formato válido");
            fieldValidation.email.err = false;
        }

        // fim da verificacao dos erros

        // se até essa parte da funcao o campo err não foi marcado como false, ele será marcado como true
        // para indicar que o que foi digitado está correto
        if (fieldValidation.email.err !== false) {
            fieldValidation.email.err = true;
        }

        // mesmo que o de cima só que dessa vez com senha
        if (fieldValidation.pass.err !== false) {
            fieldValidation.pass.err = true;
        }

        // se existir erros, vai setar o vetor de erros na const fieldvalidation
        if (!ver) {
            fieldValidation.email.msg = msgEmail;
            fieldValidation.pass.msg = msgPass;
        }

        return fieldValidation;
    }

    // console.log("render");
    // console.log(fieldValidation);

    //funcao executada ao submitar o formulário, ela para a execucao antes caso a funcao canbesubmitted retorne false
    function handleSubmit(e) {
        e.preventDefault();
        if (!canBeSubmitted()) {
            return;
        }
        const userData = { email, password };
        login(userData, false);
        // console.log("enviado");
    }

    // retorna true ou false se o formulario pode ser enviado
    function canBeSubmitted() {
        const errors = validate(email, password);
        const isDisabled = Object.keys(errors).some((x) => !errors[`${x}`].err);
        // console.log(errors);
        // console.log("desativado: " + isDisabled);
        return !isDisabled;
    }

    // const isEnabled = Object.keys(fieldValidation).some((key) => fieldValidation[`${key}`].err);
    // const isEnabled = validate();
    const errors = validate(email, password);
    const isDisabled = Object.keys(errors).some((x) => !errors[`${x}`].err);

    // retorna true ou false se o input deveria mostrar os erros
    const shouldMarkError = (field) => {
        const hasError = !errors[`${field}`].err;
        // const hasError = !canSubmit();
        // if (fieldValidation[`${field}`].err === null) {
        //     return null;
        // }
        // console.log("has error: " + hasError + " - field: " + field);
        const shouldShow = touched[field];
        // console.log("Should show: " + shouldShow);
        if (!shouldShow) {
            return null;
        }
        return hasError ? shouldShow : false;
    };
    function handleGoogleLogin() {
        login(null, true);
    }

    function handleForgotPass() {
        if (errors.email.err) {
            forgotPassword(email);
        } else {
            toast.error("O email precisa estar preenchido corretamente!");
            setTouched({ ...touched, email: true });
        }
    }

    return (
        <ContainerCenter>
            <LoginWrapper>
                <img alt="logotipo da empresa" src={Logo} />
                <form onSubmit={handleSubmit}>
                    <Input
                        blur={() => {
                            handleBlur("email");
                        }}
                        inputValue={email}
                        errMsg={errors.email.msg}
                        ocHandler={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        isValid={shouldMarkError("email") ? false : shouldMarkError("email") === null ? null : true} /* false - erro, null - nada, true - correto */
                        label="Email:"
                        placeholder="exemplo@exemplo.com.br"
                    />
                    <Input
                        blur={() => {
                            handleBlur("pass");
                        }}
                        inputValue={password}
                        errMsg={errors.pass.msg}
                        ocHandler={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        isValid={shouldMarkError("pass") ? false : shouldMarkError("pass") === null ? null : true}
                        label="Senha:"
                        placeholder="Insira sua senha"
                    />
                    <ContainerR>
                        <BtLogin disabled={loadAuth ? true : isDisabled}>{loadAuth ? "Carregando..." : "Entrar"}</BtLogin>
                        {loadAuth ? <Loading className="loading" /> : ""}
                    </ContainerR>
                    <LinkPassword to="" onClick={handleForgotPass}>
                        Esqueci minha senha
                    </LinkPassword>
                </form>
                <BtGLogin onClick={handleGoogleLogin}>Entrar com Google</BtGLogin>
                <LinkRegister to="/register">Cadastrar-se</LinkRegister>
            </LoginWrapper>
        </ContainerCenter>
    );
}

export default Login;
