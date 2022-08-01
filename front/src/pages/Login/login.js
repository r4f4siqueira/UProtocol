//react
import React, { useContext } from "react";

//components
import Input from "../../components/Input/Input";
import Auth from "../../context/auth";

//styles
import { ContainerCenter } from "../../styles/styles";
import Logo from "../../assets/logo/logo.png";
import { BtLogin, LoginWrapper, LinkPassword, BtGLogin, LinkRegister } from "./styles";

function Login() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("bomdia");
    }

    return (
        <ContainerCenter>
            <LoginWrapper>
                <img src={Logo} />
                <form onSubmit={handleSubmit}>
                    <Input type="email" isRight={"false"} label="Email:" placeholder="exemplo@exemplo.com.br" />
                    <Input type="password" label="Senha:" placeholder="Insira sua senha" />
                    <BtLogin>Entrar</BtLogin>
                    <LinkPassword to="/">Esqueci minha senha</LinkPassword>
                </form>
                <BtGLogin>Entrar com Google</BtGLogin>
                <LinkRegister to="/">Cadastrar-se</LinkRegister>
            </LoginWrapper>
        </ContainerCenter>
    );
}

export default Login;
