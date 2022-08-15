import React from "react";

import { AiOutlineBars } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";

import PageHeader from "../../components/PageHeader/PageHeader";
import Tabs from "../../components/Tabs/Tabs";

import { ContainerPage, PanelPage } from "../../styles/styles";

function Protocols() {
    const tabs = [
        { icon: <AiOutlineBars />, name: "Seus protocolos", navto: "/protocols/overview" },
        { icon: <BsHourglassSplit />, name: "Fila de espera", navto: "/protocols/queue" },
        { icon: <MdDoneAll />, name: "Concluídos", navto: "/protocols/finished" },
    ];

    return (
        <ContainerPage>
            <PageHeader title="Protocolos">
                <FaClipboardList className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs Tabs={tabs} />
            </PanelPage>
        </ContainerPage>
    );
}

export default Protocols;
