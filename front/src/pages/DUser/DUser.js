import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.tsx";

import { ContainerC, ContainerCenter, LinkText, PanelPage, Titles } from "../../styles/styles";
import { LinkTextGreen } from "./styles";
function DUser() {
    const navigate = useNavigate();
    const { logout, manageAccount, user } = useContext(AuthContext);

    function handleLogout() {
        console.log(user);
        logout();
    }

    function handleActivateAccount() {
        if (window.confirm("Você tem certeza que deseja reativar sua conta?")) {
            console.log(user);
            manageAccount(true, user.uid);
        }
    }
    return (
        <ContainerCenter>
            <PanelPage>
                <Titles>
                    <h1>Sua conta está desativada!</h1>
                    <ContainerC>
                        <LinkText onClick={handleLogout} to="">
                            Voltar para login{" "}
                        </LinkText>
                        <LinkTextGreen onClick={handleActivateAccount} to="">
                            Reativar Conta
                        </LinkTextGreen>
                    </ContainerC>
                </Titles>
            </PanelPage>
        </ContainerCenter>
    );
}

export default DUser;
