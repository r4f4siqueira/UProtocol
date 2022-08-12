//react
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AiOutlineBars, AiOutlinePoweroff } from "react-icons/ai";
import { BiBuildings } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { ImSortNumbericDesc } from "react-icons/im";
import { FiGrid } from "react-icons/fi";

import { AuthContext } from "../../context/auth.tsx";
import AsyncImage from "../AsyncImage/AsyncImage";

import { ContainerC, Titles } from "../../styles/styles";

//styles
import { NavbarContainer, AvatarWrapper, UserWrapper, LinksWrapper, NavFooter } from "./styles";
import NavOption from "../NavOption/NavOption";
function Navbar(props) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(user);

    function handleNavigate(location) {
        if (location) {
            navigate(location);
        }
    }

    function handleLogout() {
        logout();
    }

    return (
        <NavbarContainer>
            <ContainerC>
                <UserWrapper
                    onClick={() => {
                        handleNavigate("/profile");
                    }}
                >
                    <AvatarWrapper>
                        <AsyncImage src={user.avatar} />
                    </AvatarWrapper>
                    <Titles>
                        <h3 title={user.name}>{user.name}</h3>
                        <h5 title={user.email}>{user.email}</h5>
                    </Titles>
                </UserWrapper>
                <LinksWrapper>
                    <NavOption isSelected={props?.opt === "protocols"} title="Protocolos" navto="/protocols">
                        <AiOutlineBars />
                    </NavOption>
                    <NavOption isSelected={props?.opt === "company"} title="Empresas" navto="/company">
                        <BiBuildings />
                    </NavOption>
                    <NavOption isSelected={props?.opt === "sectors"} title="Setores" navto="/sectors">
                        <FiGrid />
                    </NavOption>
                    <NavOption isSelected={props?.opt === "clients"} title="Clientes" navto="/clients">
                        <BsPersonFill />
                    </NavOption>
                    <NavOption isSelected={props?.opt === "priorities"} title="Prioridades" navto="/priorities">
                        <ImSortNumbericDesc />
                    </NavOption>
                </LinksWrapper>
            </ContainerC>
            <NavFooter onClick={handleLogout}>
                <AiOutlinePoweroff />
                Deslogar
            </NavFooter>
        </NavbarContainer>
    );
}

export default Navbar;
