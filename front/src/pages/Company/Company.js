import React from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { ContainerPage, PanelPage } from "../../styles/styles";

function Company() {
    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral", navto: "/company/overview" },
        { icon: <FiGrid />, name: "Setores", navto: "/company/sectors" },
        { icon: <BsPersonBadge />, name: "Funcionarios", navto: "/company/employees" },
    ];
    return (
        <ContainerPage>
            <PageHeader title="Empresas">
                <BiBuildings className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs Tabs={tabs} />
            </PanelPage>
        </ContainerPage>
    );
}

export default Company;
