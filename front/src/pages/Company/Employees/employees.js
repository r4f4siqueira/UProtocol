import React from "react";
import FormEmployees from "./formEmployees";
import { PanelEmployees } from "./styles";
import TableEmployees from "./tableEmployees";

function Employees() {
    return (
        <>
            <FormEmployees />
            <PanelEmployees>
                <TableEmployees />
            </PanelEmployees>
        </>
    );
}

export default Employees;
