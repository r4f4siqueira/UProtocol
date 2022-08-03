//react
import React, { useContext, useState } from "react";

//components
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/auth.tsx";

//styles
import { ContainerCenter } from "../../styles/styles";
import Logo from "../../assets/logo/logo.png";
import { BtLogin, LoginWrapper, LinkPassword, BtGLogin, LinkRegister } from "../Login/styles";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const [touched, setTouched] = useState({ name: false, email: false, pass: false, repPass: false });

    function handleBlur(field) {
        if (!touched[`${field}`] === true) {
            setTouched({ ...touched, [field]: true });
        }
    }

    /**
     * verifica algumas condicões para validar o que foi digitado
     * @param {string} tnome nome completo do usuario
     * @param {string} temail email do usuario
     * @param {string} tsenha senha do usuario
     * @param {string} trepPassword senha do campo repita a senha
     * @return {fieldValidation} objeto contendo erros e mensagem de erros dos campos
     */
    function validate(tnome, temail, tpassword, trepPassword) {
        const fieldValidation = {
            name: { err: null, msg: [""] },
            email: { err: null, msg: [""] },
            pass: { err: null, msg: [""] },
            repPass: { err: null, msg: [""] },
        };

        let ver = true;
        let msgName = ["Erros encontrados: "];
        let msgEmail = ["Erros encontrados: "];
        let msgPass = ["Erros encontrados: "];
        let msgRepPass = ["Erros encontrados: "];

        // REX (regular expression) para email, valida se está algo entre teste@teste.com
        const emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // REX para nome, valida se não contém alguns caracteres especiais, números, etc
        const nameREX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        // REX para senha, valida se não possui mais de 20 caracteres, e não possui nenhum caractere especial relacionado a programacao, como $
        const passwordREX = /^([a-zA-Z0-9@*#]{0,20})$/;

        //verificacoes de senha:

        // lança um erro se a senha for menor que 6 digitos
        if (tpassword.length < 6) {
            ver = false;
            msgPass.push("A senha deve possuir mais de 6 caracteres");
            fieldValidation.pass.err = false;
        }

        // lança um erro se a senha for menor que 6 digitos
        if (trepPassword.length < 6) {
            ver = false;
            msgPass.push("A senha deve possuir mais de 6 caracteres");
            fieldValidation.pass.err = false;
        }

        // lança um erro aos 2 campos se as senhas não coincidirem
        if (tpassword !== trepPassword) {
            ver = false;
            msgPass.push("As senhas devem ser iguais!");
            msgRepPass.push("As senhas devem ser iguais!");
            fieldValidation.pass.err = false;
            fieldValidation.repPass.err = false;
        }

        // lança um erro se a senha não coincidir com o REX, também verifica se a mesma está vazia
        if (!tpassword.match(passwordREX)) {
            ver = false;
            fieldValidation.pass.err = false;
            if (tpassword === "") {
                msgPass.push("A senha não pode estar vazia");
            } else {
                msgPass.push("A senha contém caracteres inválidos");
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
            msgEmail.push("O Email não possui formato válido");
            fieldValidation.email.err = false;
        }

        //verificações de nome
    }

    return (
        <ContainerCenter>
            <LoginWrapper>
                <img alt="logotipo da empresa" src={Logo} />
                <form>
                    <Input
                        label="Nome Completo: "
                        placeholder="Uprotocol da Silva"
                        type="text"
                        inputValue={name}
                        errMsg={/*errors.nome.msg*/ ""}
                        ocHandler={(e) => {
                            setName(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("nome");
                        }}
                    />
                    <Input
                        label="Email: "
                        placeholder="Uprotocolsilva@uprotocol.com"
                        type="email"
                        inputValue={email}
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
                        ocHandler={(e) => {
                            setPassword(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("pass");
                        }}
                    />
                    <Input
                        label="Repita a Senha: "
                        placeholder="uprotocol@123"
                        type="password"
                        inputValue={repPassword}
                        ocHandler={(e) => {
                            setRepPassword(e.target.value);
                        }}
                        blur={() => {
                            handleBlur("repPass");
                        }}
                    />
                    <BtLogin>Entrar</BtLogin>
                </form>
                <BtGLogin>Entrar com Google</BtGLogin>
                <LinkRegister to="/">Já tenho uma conta</LinkRegister>
            </LoginWrapper>
        </ContainerCenter>
    );
}

export default Register;
