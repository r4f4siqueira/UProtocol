import React from "react";
import Input from "../Input/Input";
function PageHeader(props) {
    return (
        <div>
            <Input label={props.title} />
        </div>
    );
}

export default PageHeader;
