// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// import { AuthContext } from "../../context/auth.tsx";
// import api from "../../services/backendAPI";
import { MdDashboardCustomize } from "react-icons/md";

// import AsyncImage from "../../components/AsyncImage/AsyncImage";
import PageHeader from "../../components/PageHeader/PageHeader";

import { ContainerPage } from "../../styles/styles";
// import { BtLogout } from "./styles";

function Dashboard() {
    // const { logout, user } = useContext(AuthContext);

    // console.log(user);

    // function handleLogout() {
    //     // console.log(user);
    //     logout();
    // }

    return (
        <ContainerPage>
            <PageHeader title="Dashboard">
                <MdDashboardCustomize className="icon" />
            </PageHeader>
        </ContainerPage>
    );
}

export default Dashboard;
