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

function Company() {
    const tabs = [
        { icon: <BiBuildings />, name: "Visão geral", navto: "/company/overview" },
        { icon: <FiGrid />, name: "Setores", navto: "/company/sectors" },
        { icon: <BsPersonBadge />, name: "Funcionarios", navto: "/company/employees" },
    ];

    const { tab } = useParams();
    const navTab = "/company/" + tab;
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

    //setores
    const [sectors, setSectors] = useState();
    const [selectedSector, setSelectedSector] = useState();

    //PENDENTE - separar cada tab em um componente separado
    useEffect(() => {
        setLoading(true);
        //PENDENTE - separar essas funcoes em cada componente
        function loadCompanyData() {
            api.get(`/empresa`, { params: { uid: user.uid } })
                .then(async (resp) => {
                    // console.log(resp);
                    await setCompanyData(resp.data);
                    loadSectorData();
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.response.data) {
                        console.log(err.response.data.erro?.msg);
                    }
                    setHasCompany(false);
                    setLoading(false);
                });
        }
        loadCompanyData();
    }, []);

    function loadSectorData() {
        console.log(user.uid);
        api.get("/setor", { params: { uid: user.uid } })
            .then(async (resp) => {
                // console.log(resp);
                setSectorsData(resp.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response.data) {
                    console.log(err.response.data.erro?.msg);
                }
                setLoading(false);
            });
    }

    async function setSectorsData(data) {
        const tsectorlist = data;
        tsectorlist.every((sector) => {
            if (company?.id === sector.empresa) {
                sector.empresa = company?.fantasia;
            }
            if (typeof sector.ativo === "boolean") {
                if (sector.ativo === true) {
                    sector.ativo = "1";
                } else {
                    sector.ativo = "0";
                }
            }
            return true;
        });

        tsectorlist.sort((a, b) => b.id - a.id);

        setSectors(tsectorlist);
    }

    async function setCompanyData(data) {
        const tcompany = data;
        tcompany.userc = await (await api.get(`/funcionario/${tcompany.userc}`)).data.nome;
        tcompany.created_at = tcompany.created_at.substring(0, 10);
        tcompany.CNPJ_CPF = tcompany.CNPJ_CPF === null ? "" : tcompany.CNPJ_CPF;

        if (typeof tcompany.ativo === "boolean") {
            if (tcompany.ativo === true) {
                tcompany.ativo = "1";
            } else {
                tcompany.ativo = "0";
            }
        }

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
                //PENDENTE - fazer a tela de listagem de setores (tabela ou lista) de acordo com o
                //mockup, também criar uma tela de cadastro ou componente que vai ser utilizado com
                //as outras entidades
                function handleSector(evt) {
                    evt.preventDefault();

                    // se existir ID, editar setor
                    if (selectedSector?.id) {
                        const data = {
                            id: selectedSector?.id,
                            ativo: selectedSector?.ativo ? selectedSector?.ativo : "0",
                            nome: selectedSector?.nome,
                            uid: user.uid,
                            empresa: company.id,
                        };
                        api.put(`/setor/${data.id}`, data)
                            .then((resp) => {
                                // console.log(resp);
                                loadSectorData();
                                toast.info("Setor editado com sucesso!");
                                handleCancelSector();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        // se nao existir ID, criar setor
                        const data = {
                            ativo: selectedSector?.ativo ? selectedSector?.ativo : "0",
                            nome: selectedSector?.nome,
                            empresa: company.id,
                            uid: user.uid,
                        };
                        console.log("criar");
                        console.log(data);
                        api.post(`/setor`, data)
                            .then((resp) => {
                                console.log(resp);
                                // addSector(resp.data);
                                loadSectorData();
                                toast.success("Setor criado com sucesso!");
                                handleCancelSector();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }

                // function addSector(data) {
                //     const tsector = data;
                //     if (company?.id === tsector.empresa) {
                //         tsector.empresa = company?.fantasia;
                //     }
                //     if (typeof tsector.ativo === "boolean") {
                //         if (tsector.ativo === true) {
                //             tsector.ativo = "1";
                //         } else {
                //             tsector.ativo = "0";
                //         }
                //     }
                //     setSectors([...sectors, tsector]);
                // }

                function handleCancelSector() {
                    setSelectedSector(null);
                }
                function handleRemoveSector(id) {
                    if (window.confirm("Tem certeza?") === true) {
                        api.delete(`/setor/${id}`)
                            .then(() => {
                                loadSectorData();
                                toast.success("Setor deletado com sucesso!");
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }

                const disableSubmit = selectedSector?.nome === undefined || selectedSector?.nome === "" || selectedSector === null;
                return (
                    <ContainerPage>
                        <PageHeader title="Empresas">
                            <BiBuildings className="icon" />
                        </PageHeader>
                        <PanelPage>
                            <Tabs Tabs={tabs} active={navTab} />
                            <FormSectors className={selectedSector?.id ? "edit" : ""}>
                                <SectorFormWrapper>
                                    <form
                                        onSubmit={(evt) => {
                                            handleSector(evt);
                                        }}
                                    >
                                        <div className="center inputs">
                                            <Input
                                                label="Nome setor"
                                                placeholder="Nome do setor"
                                                inputValue={selectedSector?.nome}
                                                isValid={null}
                                                ocHandler={(e) => {
                                                    setSelectedSector({ ...selectedSector, nome: e.target.value });
                                                }}
                                            />
                                            <ContainerR className="detailsWrapper">
                                                <Titles>{selectedSector?.id && `Selecionado: id - ${selectedSector?.id}`}</Titles>
                                                <Titles className="ativoWrapper">
                                                    <label>Ativo:</label>
                                                    <input
                                                        className="ativo"
                                                        type="checkbox"
                                                        checked={selectedSector?.ativo === "1" ? true : false}
                                                        onChange={(e) => {
                                                            setSelectedSector({ ...selectedSector, ativo: e.target.checked ? "1" : "0" });
                                                        }}
                                                    />
                                                </Titles>
                                            </ContainerR>
                                        </div>
                                        <div className="center submit">
                                            <BtCancel disabled={disableSubmit} type="button" onClick={handleCancelSector}>
                                                Cancelar
                                            </BtCancel>
                                            <BtSubmit disabled={disableSubmit} type="submit">
                                                Gravar
                                            </BtSubmit>
                                        </div>
                                    </form>
                                </SectorFormWrapper>
                            </FormSectors>
                            <ListSectors>
                                <TableSectors sectorList={sectors} setSector={setSelectedSector} handleRemoveSector={handleRemoveSector} />
                            </ListSectors>
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
