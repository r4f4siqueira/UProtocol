import React from "react";
import Select from "react-select";
import { DropboxWrapper } from "./styles";
function Dropbox({ options, label, ocHandler, inputValue, search }) {
    return (
        <DropboxWrapper>
            <div>
                <label>{label}</label>
                <Select
                    onChange={(e) => {
                        ocHandler(e);
                    }}
                    value={inputValue}
                    isClearable
                    isSearchable={search ? search : false}
                    className="dropbox"
                    options={options}
                />
            </div>
        </DropboxWrapper>
    );
}

export default Dropbox;
