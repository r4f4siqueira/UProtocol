//react
import React, { useContext, useState } from "react";

//components
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/auth.tsx";

//styles
import { ContainerCenter } from "../../styles/styles";
import Logo from "../../assets/logo/logo.png";
import { BtLogin, LoginWrapper, LinkPassword, BtGLogin, LinkRegister } from "./styles";

function Login() {
    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fieldValidation = {
        email: [null, ""],
        senha: [null, ""],
    };

    /**
     * verifica algumas condicões basicas para liberar o botao de submit
     * @return {boolean} true ou false se pode dar submit ou nao
     */
    function canSubmit() {
        let ver = true;
        let msgEmail = "";

        if (password < 6) {
            ver = false;
        }

        if (!email.includes("@")) {
            ver = false;
            msgEmail = msgEmail == "" ? "O Email deve possuir (@)" : msgEmail + ", e possuir (@)";
            fieldValidation.email[0] = false;
        }

        if (!email.includes(".")) {
            ver = false;
            msgEmail = msgEmail == "" ? "O Email deve possuir (.)" : msgEmail + ", e possuir (.)";
            fieldValidation.email[0] = false;
        }

        if (fieldValidation.email[0] !== false) {
            fieldValidation.email[0] = true;
        }

        if (!ver) {
            fieldValidation.email[1] = msgEmail;
        }

        return ver;
    }
    const isEnabled = canSubmit();

    console.log("render");
    function handleSubmit(e) {
        e.preventDefault();
        if (!canSubmit()) {
            return;
        }
        alert("bomdia");
    }

    /**
     * Valida os campos passados no input de acordo com as condicoes da função
     * @param   {string} email  E-mail do usuario
     * @param   {string} password  Senha do usuario
     * @return {Object = {email: boolean, senha: boolean, msg: String} - Objeto de campos com erro e mensagens de erro
     */
    function validate(email, password) {}

    return (
        <ContainerCenter>
            <LoginWrapper>
                <img alt="logotipo da empresa" src={Logo} />
                <form onSubmit={handleSubmit}>
                    <Input
                        inputValue={email}
                        errMsg={fieldValidation.email[1]}
                        ocHandler={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        isValid={fieldValidation.email[0]}
                        label="Email:"
                        placeholder="exemplo@exemplo.com.br"
                    />
                    <Input
                        inputValue={password}
                        errMsg={fieldValidation.senha[1]}
                        ocHandler={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        isValid={fieldValidation.senha[0]}
                        label="Senha:"
                        placeholder="Insira sua senha"
                    />
                    <BtLogin disabled={!isEnabled}>Entrar</BtLogin>
                    <LinkPassword to="/">Esqueci minha senha</LinkPassword>
                </form>
                <BtGLogin>Entrar com Google</BtGLogin>
                <LinkRegister to="/">Cadastrar-se</LinkRegister>
            </LoginWrapper>
        </ContainerCenter>
    );
}

export default Login;
