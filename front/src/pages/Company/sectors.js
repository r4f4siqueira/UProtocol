import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { FormSectors, ListSectors, SectorFormWrapper } from "./styles";
import { AuthContext } from "../../context/auth.tsx";
import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { BtCancel, BtSubmit, ContainerR, Titles } from "../../styles/styles";
import TableSectors from "./TableSectors";
function Sectors({ company }) {
    const [sectors, setSectors] = useState();
    const [selectedSector, setSelectedSector] = useState();
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        if (company) {
            loadSectorData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company]);

    function loadSectorData() {
        console.log(user.uid);
        api.get(`/setor/${company.id}`, { params: { uid: user.uid } })
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
        <>
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
        </>
    );
}

export default Sectors;
