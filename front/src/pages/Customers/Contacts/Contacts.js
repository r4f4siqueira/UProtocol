import React from "react";
import { PanelTable } from "../../../styles/styles";
import FormContacts from "./formContacts";
import TableContacts from "./tableContacts";
function Contacts() {
    return (
        <>
            <FormContacts />
            <PanelTable>
                <TableContacts />
            </PanelTable>
        </>
    );
}

export default Contacts;
