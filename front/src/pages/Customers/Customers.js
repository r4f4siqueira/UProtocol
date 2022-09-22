import React from "react";
import { useParams } from "react-router";

import { BsFillTelephoneFill, BsPersonFill } from "react-icons/bs";

import { ContainerPage, PanelPage } from "../../styles/styles";

import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";
import Overview from "./Overview/Overview";
import Contacts from "./Contacts/Contacts";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

function Customers() {
    const tabs = [
        { icon: <BsPersonFill />, name: "Clientes", navto: "/customers/overview" },
        { icon: <BsFillTelephoneFill />, name: "Contatos", navto: "/customers/contacts" },
    ];

    const { tab } = useParams();
    const navTab = "/customers/" + tab;
    let selectedTab;

    const customers = useSelector((state) => state.Customer);

    switch (tab) {
        case "overview":
            //PENDENTE - trocar o formulário e esse modelo para apenas um display, criar uma
            //pagina de cadastro/edição de empresas para lidar com isso.

            selectedTab = <Overview />;
            break;
        case "contacts":
            selectedTab = <Contacts />;
            break;
        default:
            break;
    }

    return (
        <ContainerPage>
            <PageHeader title="Clientes">
                <BsPersonFill className="icon" />
            </PageHeader>
            <PanelPage>
                {customers.isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Tabs Tabs={tabs} active={navTab} />
                        {selectedTab}
                    </>
                )}
            </PanelPage>
        </ContainerPage>
    );
}

export default Customers;
