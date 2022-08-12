import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ContainerPage } from "../../styles/styles";
import { FiGrid } from "react-icons/fi";
function Sectors() {
    return (
        <ContainerPage>
            <PageHeader title="Setores">
                <FiGrid className="icon" />
            </PageHeader>
        </ContainerPage>
    );
}

export default Sectors;
