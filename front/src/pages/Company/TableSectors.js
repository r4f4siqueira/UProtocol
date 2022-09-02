import React from "react";
import { TBEdit, TBRemove } from "../../styles/styles";
import { SectorTableWrapper } from "./styles";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

function TableSectors({ sectorList, setSector, handleRemoveSector }) {
    // console.log(sectorList);

    if(sectorList === undefined ||sectorList.length === 0 ){
        sectorList =  [{ id: "ops!", nome:"Você não tem setores cadastrados!" }];
    } else {
        console.log(sectorList);
    }
    

    function handleSelectSector(index) {
        // console.log(sectorList[index]);
        setSector(sectorList[index]);
    }
    function handleExclude() {
        // console.log(sectorList[index]);
    }

    return (
        <SectorTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th> ID Criador </th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sectorList.map((sector, index) => {
                        return (
                            <tr key={"setor: " + sector.id}>
                                <td>{sector.id}</td>
                                <td>{sector.nome}</td>
                                <td>{sector.userc}</td>
                                <td>{sector.ativo === "1" ? "Sim" : "Não"}</td>
                                
                                {sector.id === "ops!" 
                                ? 
                                "" 
                                : 
                                <td>
                                    <TBEdit
                                        onClick={() => {
                                            handleSelectSector(index);
                                        }}
                                    >
                                        <BsPencilFill />
                                    </TBEdit>{" "}
                                    <TBRemove
                                        onClick={() => {
                                            handleRemoveSector(sector.id);
                                        }}
                                    >
                                        <BsTrashFill />
                                    </TBRemove>
                                </td>}
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </SectorTableWrapper>
    );
}

export default TableSectors;
