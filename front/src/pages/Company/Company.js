import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router";
import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";
import { AuthContext } from "../../context/auth.tsx";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { BtCancel, BtSubmit, ContainerBTW, ContainerC, ContainerCenter, ContainerPage, ContainerR, PanelPage, Titles } from "../../styles/styles";
import { CompanyFormWrapper, CompanyOverview, FormButtonsWrapper } from "./styles";
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

    const [originalValues, setOriginalValues] = useState();
    const [company, setCompany] = useState();
    const [sectors, setSectors] = useState();

    const [loading, setLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(false);
    const [saving, setSaving] = useState(false);

    const { user } = useContext(AuthContext);

    // OBS - achei melhor deixar tudo em um state company e alterando diretamente lá
    // const [razaoSocial, setRazaoSocial] = useState(company?.razaosocial);
    // const [nomeFantasia, setNomeFantasia] = useState(company?.fantasia);
    // const [cnpjCpf, setCnpjCpf] = useState(company?.CPF_CNPJ);
    // const CNPJ_CPF_REX = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
    const isDisabled =
        originalValues?.razaosocial === company?.razaosocial &&
        originalValues?.fantasia === company?.fantasia &&
        originalValues?.CNPJ_CPF === company?.CNPJ_CPF &&
        originalValues?.ativo === company?.ativo;

    useEffect(() => {
        setLoading(true);
        function LoadCompanyData() {
            //PENDENTE - buscar a empresa que o funcionário atualmente de encontra
            //TEMPORARIO - Buscando atualmente a empresa de id = 1 que será a criada pelo usuário
            const data = new FormData();
            api.get(`/empresas`, { params: { uid: user.uid } })
                .then(async (resp) => {
                    // console.log(resp);
                    const tcompany = resp.data;
                    tcompany.userc = await (await api.get(`/funcionario/${tcompany.userc}`)).data.nome;
                    tcompany.created_at = tcompany.created_at.substring(0, 10);
                    setOriginalValues(tcompany);
                    setCompany(tcompany);

                    setHasCompany(true);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.response.data.erro) {
                        console.log(err.response.data.erro?.msg);
                    }
                    console.log(err.response.data.erro?.msg);
                    setHasCompany(false);
                    setLoading(false);
                });
        }
        LoadCompanyData();
    }, []);

    function handleSubmit(evt) {
        evt.preventDefault();
        alert("bomdia");
    }

    function handleCancel() {
        setCompany(originalValues);
    }

    console.log(company);

    if (loading) {
        return (
            <ContainerPage>
                <PageHeader title="Empresas">
                    <BiBuildings className="icon" />
                </PageHeader>
                <PanelPage>
                    <Tabs Tabs={tabs} active={navTab} />
                    <ContainerCenter>
                        <Titles>
                            <h1>Carregando...</h1>
                        </Titles>
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
                                        <form
                                            onSubmit={(evt) => {
                                                handleSubmit(evt);
                                            }}
                                        >
                                            <Titles>
                                                <ContainerBTW>
                                                    <span>
                                                        <h3>ID: {company?.id}</h3>
                                                    </span>
                                                    <span>
                                                        <ContainerR>
                                                            <h3>Ativo: </h3>
                                                            <input
                                                                title="ativo"
                                                                type="checkbox"
                                                                checked={company?.ativo}
                                                                onChange={(e) => {
                                                                    setCompany({ ...company, ativo: e.target.checked });
                                                                }}
                                                            />
                                                        </ContainerR>
                                                    </span>
                                                </ContainerBTW>
                                            </Titles>
                                            <Input
                                                label="Razão social:"
                                                placeholder="Razão social"
                                                inputValue={company?.razaosocial}
                                                isValid={null}
                                                ocHandler={(e) => {
                                                    setCompany({ ...company, razaosocial: e.target.value });
                                                }}
                                            />
                                            <Input
                                                label="Fantasia:"
                                                placeholder="Nome fantasia"
                                                inputValue={company?.fantasia}
                                                isValid={null}
                                                ocHandler={(e) => {
                                                    setCompany({ ...company, fantasia: e.target.value });
                                                }}
                                            />
                                            <Input
                                                label="CPNJ/CPF:"
                                                placeholder="CPNJ/CPF"
                                                inputValue={company?.CNPJ_CPF}
                                                isValid={null}
                                                ocHandler={(e) => {
                                                    setCompany({ ...company, CNPJ_CPF: e.target.value });
                                                }}
                                            />

                                            <FormButtonsWrapper>
                                                <BtCancel disabled={saving ? true : isDisabled} type="button" onClick={handleCancel}>
                                                    Cancelar
                                                </BtCancel>
                                                <BtSubmit disabled={saving ? true : isDisabled} type="submit">
                                                    Salvar mudanças
                                                </BtSubmit>
                                            </FormButtonsWrapper>
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
