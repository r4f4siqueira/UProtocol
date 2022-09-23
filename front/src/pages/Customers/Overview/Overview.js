import React from "react";
import { PanelTable } from "../../../styles/styles";
import FormCustomers from "./formCustomers";
import TableCustomers from "./tableCustomers";
function Overview() {
    return (
        <>
            <FormCustomers />
            <PanelTable>
                <TableCustomers />
            </PanelTable>
        </>
    );
}

export default Overview;
