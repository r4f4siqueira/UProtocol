import React from "react";
import { Link } from "react-router-dom";
import { ContainerC, ContainerCenter, ContainerPage, PanelPage, Titles } from "../../styles/styles";
function Error() {
    return (
        <ContainerCenter>
            <ContainerC>
                <PanelPage>
                    <Titles>
                        <h1>Página não encontrada</h1>
                        <Link to="/"> Voltar ao inicio</Link>
                    </Titles>
                </PanelPage>
            </ContainerC>
        </ContainerCenter>
    );
}

export default Error;
