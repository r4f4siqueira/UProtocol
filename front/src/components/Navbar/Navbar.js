//react
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../context/auth.tsx";
import { Titles } from "../../styles/styles";
import AsyncImage from "../AsyncImage/AsyncImage";

//styles
import { NavbarContainer, AvatarWrapper, UserWrapper } from "./styles";
function Navbar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(user);

    function handleNavigate(location) {
        if (location) {
            navigate(location);
        }
    }
    return (
        <NavbarContainer>
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
        </NavbarContainer>
    );
}

export default Navbar;
