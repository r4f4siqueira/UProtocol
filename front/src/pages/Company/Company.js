import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { ContainerPage, PanelPage } from "../../styles/styles";

import Employees from "./Employees/Employees";
import Sectors from "./Sectors/Sectors";
import Overview from "./Overview/Overview";
import Loading from "../Loading/Loading";

import { AuthContext } from "../../context/auth.tsx";
import { getCompany } from "../../store/actions/company.tsx";
import { getSectors } from "../../store/actions/sector.tsx";
import { getEmployees } from "../../store/actions/employee.tsx";

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
        async function loadData() {
            if (company.hasCompany === true && company.companyData !== null) {
                await dispatch(getSectors(user.uid, company.companyData.id));
                await dispatch(getEmployees(user.uid, company.companyData.id));
            }
        }
        loadData();
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
                {company.isLoading ? (
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

export default Company;
