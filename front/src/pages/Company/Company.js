import React from "react";
import { BiBuildings } from "react-icons/bi";
import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";
import { ContainerPage, PanelPage } from "../../styles/styles";

function Company() {
    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral" },
        { icon: <BiBuildings />, name: "Visão" },
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
