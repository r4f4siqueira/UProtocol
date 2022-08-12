import React from "react";
import { ImSortNumbericDesc } from "react-icons/im";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ContainerPage } from "../../styles/styles";
function Priorities() {
    return (
        <ContainerPage>
            <PageHeader title="Prioridades">
                <ImSortNumbericDesc className="icon" />
            </PageHeader>
        </ContainerPage>
    );
}

export default Priorities;
