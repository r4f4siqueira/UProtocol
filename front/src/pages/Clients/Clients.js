import React from "react";

import { BsPersonFill } from "react-icons/bs";

import { ContainerPage } from "../../styles/styles";

import PageHeader from "../../components/PageHeader/PageHeader";

function Clients() {
    return (
        <ContainerPage>
            <PageHeader title="Clientes">
                <BsPersonFill className="icon" />
            </PageHeader>
        </ContainerPage>
    );
}

export default Clients;
