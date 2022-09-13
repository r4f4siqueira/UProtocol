import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router";
import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";
import { AuthContext } from "../../context/auth.tsx";

import { BiBuildings } from "react-icons/bi";
import { FiGrid } from "react-icons/fi";
import { BsPersonBadge } from "react-icons/bs";

import { BtCancel, BtSubmit, ContainerBTW, ContainerC, ContainerCenter, ContainerPage, ContainerR, PanelPage, Titles } from "../../styles/styles";
import { CompanyFormWrapper, CompanyOverview, Details, FormButtonsWrapper, FormSectors, ListSectors, SectorFormWrapper } from "./styles";
import api from "../../services/backendAPI";
import Input from "../../components/Input/Input";
import { toast } from "react-toastify";
import { FormWrapper } from "../Profile/styles";
import TableSectors from "./TableSectors";
import Employees from "./employees";
import Sectors from "./sectors";

import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../store/actions/company.tsx";

function Company() {
    const testCompany = useSelector((state) => state.Company);
    const dispatch = useDispatch();

    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral", navto: "/company/overview" },
        { icon: <FiGrid />, name: "Setores", navto: "/company/sectors" },
        { icon: <BsPersonBadge />, name: "Funcionarios", navto: "/company/employees" },
    ];

    const { tab } = useParams();
    const navTab = "/company/" + tab;
    let selectedTab;
    // console.log(navTab);
    // empresa
    const [originalCompanyValues, setOriginalCompanyValues] = useState();
    const [company, setCompany] = useState();

    const [loading, setLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(false);
    const [saving, setSaving] = useState(false);

    const { user } = useContext(AuthContext);

    // OBS - achei melhor deixar tudo em um state company e alterando diretamente lá
    // const [razaoSocial, setRazaoSocial] = useState(company?.razaosocial);
    // const [nomeFantasia, setNomeFantasia] = useState(company?.fantasia);
    // const [cnpjCpf, setCnpjCpf] = useState(company?.CPF_CNPJ);
    const isDisabled =
        originalCompanyValues?.razaosocial === company?.razaosocial &&
        originalCompanyValues?.fantasia === company?.fantasia &&
        originalCompanyValues?.CNPJ_CPF === company?.CNPJ_CPF &&
        originalCompanyValues?.ativo === company?.ativo;

    const CNPJ_CPF_REX = /(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)|(^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$)/;
    const hasError = company?.CNPJ_CPF === "" ? false : !CNPJ_CPF_REX.test(company?.CNPJ_CPF);

    //PENDENTE - separar cada tab em um componente separado
    useEffect(() => {
        setLoading(true);
        //PENDENTE - separar essas funcoes em cada componente
        dispatch(getCompany(user.uid));
        function loadCompanyData() {
            api.get(`/empresa`, { params: { uid: user.uid } })
                .then(async (resp) => {
                    console.log(resp);
                    await setCompanyData(resp.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.response.data) {
                        console.log(err);
                        console.log(err.response.data);
                    }
                    setHasCompany(false);
                    setLoading(false);
                });
        }
        loadCompanyData();
    }, []);

    async function setCompanyData(data) {
        const tcompany = data;
        tcompany.created_at = tcompany.created_at.substring(0, 10);
        tcompany.CNPJ_CPF = tcompany.CNPJ_CPF === null ? "" : tcompany.CNPJ_CPF;

        if (typeof tcompany.ativo === "boolean") {
            if (tcompany.ativo === true) {
                tcompany.ativo = "1";
            } else {
                tcompany.ativo = "0";
            }
        }
        console.log(tcompany);
        setOriginalCompanyValues(tcompany);
        setCompany(tcompany);

        setHasCompany(true);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        setSaving(true);

        const data = new FormData();
        data.append("ativo", company.ativo ? company.ativo : "1");
        data.append("CNPJ_CPF", company.CNPJ_CPF);
        data.append("razaosocial", company.razaosocial);
        data.append("fantasia", company.fantasia);
        data.append("uid", user.uid);

        if (!hasCompany) {
            api.post("/empresa", data)
                .then(async (resp) => {
                    if (resp.status === 200) {
                        toast.success("Empresa criada com sucesso!");
                        await setCompanyData(resp.data);
                        setSaving(false);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setCompany(originalCompanyValues);
                    setSaving(false);
                });
        } else {
            if (company.ativo === "0") {
                if (!window.confirm("Tem certeza que deseja desativar essa empresa? a maioria das ações nela serão bloqueadas até ativá-la novamente")) {
                    setSaving(false);
                    setCompany({ ...company, ativo: "1" });
                    return;
                }
            }

            api.put(`/empresa/${company.id}`, data)
                .then(async (resp) => {
                    // console.log(resp);
                    if (resp.status === 200) {
                        toast.success("Empresa editada com sucesso!");
                        await setCompanyData(resp.data);
                        setSaving(false);
                    }
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    console.error(err);
                    setCompany(originalCompanyValues);
                    setSaving(false);
                });
        }
    }

    function handleCancel() {
        setCompany(originalCompanyValues);
    }

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

                return (
                    <ContainerPage>
                        <PageHeader title="Empresas">
                            <BiBuildings className="icon" />
                        </PageHeader>
                        <PanelPage>
                            <Tabs Tabs={tabs} active={navTab} />
                            <ContainerCenter>
                                <CompanyOverview>
                                    {hasCompany ? (
                                        <CompanyFormWrapper>
                                            <form
                                                onSubmit={(evt) => {
                                                    handleSubmit(evt);
                                                }}
                                            >
                                                <Titles>
                                                    <ContainerBTW>
                                                        <Details>
                                                            <h3>Criador: {company?.userc}</h3>
                                                            <h3>ID: {company?.id}</h3>
                                                        </Details>
                                                        <span>
                                                            <ContainerR>
                                                                <h3>Ativo: </h3>
                                                                <input
                                                                    title="ativo"
                                                                    type="checkbox"
                                                                    checked={company?.ativo === "1" ? true : false}
                                                                    onChange={(e) => {
                                                                        setCompany({ ...company, ativo: e.target.checked ? "1" : "0" });
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
                                                    <BtSubmit disabled={hasError ? true : saving ? true : isDisabled} type="submit">
                                                        Salvar mudanças
                                                    </BtSubmit>
                                                </FormButtonsWrapper>
                                            </form>
                                        </CompanyFormWrapper>
                                    ) : (
                                        <CompanyFormWrapper>
                                            <form
                                                onSubmit={(evt) => {
                                                    handleSubmit(evt);
                                                }}
                                            >
                                                <Titles>
                                                    <ContainerCenter>
                                                        <span>
                                                            <ContainerR>
                                                                <h2>Você não possui uma empresa cadastrada, preencha os dados abaixo para cadastrar uma nova</h2>
                                                            </ContainerR>
                                                        </span>
                                                    </ContainerCenter>
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
                                                    <BtSubmit disabled={hasError ? true : saving ? true : isDisabled} type="submit">
                                                        Salvar mudanças
                                                    </BtSubmit>
                                                </FormButtonsWrapper>
                                            </form>
                                        </CompanyFormWrapper>
                                    )}
                                </CompanyOverview>
                            </ContainerCenter>
                        </PanelPage>
                    </ContainerPage>
                );
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
}

export default Company;
