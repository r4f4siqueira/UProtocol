import React, { useContext, useEffect } from "react";

import { useParams } from "react-router";
import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { ContainerPage, PanelPage } from "../../styles/styles";

import Employees from "./employees";
import Sectors from "./sectors";
import Overview from "./overview";
import Loading from "../Loading/Loading";

import { getCompany } from "../../store/actions/company.tsx";
import { AuthContext } from "../../context/auth.tsx";
import { getSectors } from "../../store/actions/sector.tsx";

function Company() {
    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral", navto: "/company/overview" },
        { icon: <FiGrid />, name: "Setores", navto: "/company/sectors" },
        { icon: <BsPersonBadge />, name: "Funcionarios", navto: "/company/employees" },
    ];

    const dispatch = useDispatch();
    const company = useSelector((state) => state.Company);
    const { user } = useContext(AuthContext);

    const { tab } = useParams();
    const navTab = "/company/" + tab;
    let selectedTab;
    // console.log(navTab);

    useEffect(() => {
        async function loadCompanyData() {
            await dispatch(getCompany(user.uid));
        }
        loadCompanyData();
    }, []);

    useEffect(() => {
        async function loadSectorData() {
            if (company.hasCompany === true && company.companyData !== null) {
                await dispatch(getSectors(user.uid, company.companyData.id));
            }
        }
        loadSectorData();
    }, [company.hasCompany]);

    switch (tab) {
        case "overview":
            //PENDENTE - trocar o formulário e esse modelo para apenas um display, criar uma
            //pagina de cadastro/edição de empresas para lidar com isso.

            selectedTab = <Overview />;
            break;
        case "sectors":
            selectedTab = <Sectors />;
            break;
        case "employees":
            selectedTab = <Employees />;
            break;
        default:
            break;
    }
    return (
        <ContainerPage>
            <PageHeader title="Empresas">
                <BiBuildings className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs Tabs={tabs} active={navTab} />
                {selectedTab}
            </PanelPage>
        </ContainerPage>
    );
}

export default Company;
