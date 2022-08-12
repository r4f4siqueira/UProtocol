import React from "react";
import { useNavigate } from "react-router";
import { AiOutlineAlignCenter as Placeholder } from "react-icons/ai";
import { OptionWrapper } from "./styles";
import { Titles } from "../../styles/styles";
function NavOption({ title, navto, children, isSelected }) {
    const navigate = useNavigate();

    function handleNavigate() {
        navto ? navigate(navto) : navigate("/");
    }

    return (
        <OptionWrapper className={isSelected ? "selected " : ""} onClick={handleNavigate}>
            <Titles>
                {children ? children : <Placeholder />}
                {title || "Placeholder"}
            </Titles>
        </OptionWrapper>
    );
}

export default NavOption;
