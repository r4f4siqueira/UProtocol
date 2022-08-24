import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { ContainerCenter, ContainerPage, PanelPage, Titles } from "../../styles/styles";
import { CompanyFormWrapper, CompanyOverview } from "./styles";
import api from "../../services/backendAPI";
import Input from "../../components/Input/Input";

function Company() {
    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral", navto: "/company/overview" },
        { icon: <FiGrid />, name: "Setores", navto: "/company/sectors" },
        { icon: <BsPersonBadge />, name: "Funcionarios", navto: "/company/employees" },
    ];

    const { tab } = useParams();
    const navTab = "/company/" + tab;
    // console.log(navTab);

    const [company, setCompany] = useState();
    const [sectors, setSectors] = useState();
    const [loading, setLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function LoadCompanyData() {
            //PENDENTE - buscar a empresa que o funcionário atualmente de encontra
            //TEMPORARIO - Buscando atualmente a empresa de id = 1 que será a criada pelo usuário
            api.get("/empresa/1")
                .then((resp) => {
                    console.log(resp);
                    setCompany(resp.data);
                    setHasCompany(true);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.response.data.erro) {
                        console.log(err.response.data.erro?.msg);
                    }
                    setHasCompany(false);
                    setLoading(false);
                });
        }
        LoadCompanyData();
    }, []);

    function handleSubmit() {
        alert("bomdia");
    }

    console.log(hasCompany);

    if (loading) {
        return (
            <ContainerPage>
                <PageHeader title="Empresas">
                    <BiBuildings className="icon" />
                </PageHeader>
                <PanelPage>
                    <Tabs Tabs={tabs} active={navTab} />
                    <ContainerCenter>
                        <CompanyOverview>
                            <Titles>
                                <h1>Carregando...</h1>
                            </Titles>
                        </CompanyOverview>
                    </ContainerCenter>
                </PanelPage>
            </ContainerPage>
        );
    } else {
        switch (tab) {
            case "overview":
                //PENDENTE - trocar o formulário e esse modelo para apenas um display, criar uma
                //pagina de cadastro/edição de empresas para lidar com isso.
                //PENDENTE - trocar a tela de acordo com o state hasCompany, mostrando uma mensagem
                //na tela se possui uma empresa ou nao e entao se quer cadastrar uma nova
                return (
                    <ContainerPage>
                        <PageHeader title="Empresas">
                            <BiBuildings className="icon" />
                        </PageHeader>
                        <PanelPage>
                            <Tabs Tabs={tabs} active={navTab} />
                            <ContainerCenter>
                                <CompanyOverview>
                                    <CompanyFormWrapper>
                                        <form onSubmit={handleSubmit}>
                                            <Input label="Rasão social:" placeholder="Razão social" inputValue={company?.razaosocial} isValid={null} />
                                            <Input label="Fantasia:" placeholder="Nome fantasia" inputValue={company?.fantasia} isValid={null} />
                                        </form>
                                    </CompanyFormWrapper>
                                </CompanyOverview>
                            </ContainerCenter>
                        </PanelPage>
                    </ContainerPage>
                );
            case "sectors":
                //PENDENTE - fazer a tela de listagem de setores (tabela ou lista) de acordo com o
                //mockup, também criar uma tela de cadastro ou componente que vai ser utilizado com
                //as outras entidades

                return (
                    <ContainerPage>
                        <PageHeader title="Empresas">
                            <BiBuildings className="icon" />
                        </PageHeader>
                        <PanelPage>
                            <Tabs Tabs={tabs} active={navTab} />
                            <Titles>
                                <h1>Pagina setores</h1>
                            </Titles>
                        </PanelPage>
                    </ContainerPage>
                );
            case "employees":
                return (
                    <ContainerPage>
                        <PageHeader title="Empresas">
                            <BiBuildings className="icon" />
                        </PageHeader>
                        <PanelPage>
                            <Tabs Tabs={tabs} active={navTab} />
                            <Titles>
                                <h1>Funcionarios</h1>
                            </Titles>
                        </PanelPage>
                    </ContainerPage>
                );
            default:
                break;
        }
    }
}

export default Company;
