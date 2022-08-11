import React from "react";
import { FaClipboardList } from "react-icons/fa";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ContainerPage } from "../../styles/styles";

function Protocols() {
    return (
        <ContainerPage>
            <PageHeader title="Protocolos">
                <FaClipboardList className="icon" />
            </PageHeader>
        </ContainerPage>
    );
}

export default Protocols;
