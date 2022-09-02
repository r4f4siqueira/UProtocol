import React from "react";

import { BsFillTelephoneFill, BsPersonFill } from "react-icons/bs";

import { ContainerPage, PanelPage } from "../../styles/styles";

import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";

function Clients() {
    const tabs = [
        { icon: <BsPersonFill />, name: "Clientes", navto: "/clients/overview" },
        { icon: <BsFillTelephoneFill />, name: "Contatos", navto: "/clients/contacts" },
    ];
    return (
        <ContainerPage>
            <PageHeader title="Clientes">
                <BsPersonFill className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs Tabs={tabs} />
            </PanelPage>
        </ContainerPage>
    );
}

export default Clients;
