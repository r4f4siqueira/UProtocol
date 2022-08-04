import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.tsx";
import { ContainerCenter } from "../../styles/styles";
import { BtLogout } from "./styles";
function Dashboard() {
    const { logout, user } = useContext(AuthContext);
    function handleLogout() {
        console.log(user);
        logout();
    }
    return (
        <ContainerCenter>
            <p>pagina dashboard</p>
            <img referrerpolicy="no-referrer" src={user.avatar} />
            <BtLogout onClick={handleLogout}>Deslogar</BtLogout>
        </ContainerCenter>
    );
}

export default Dashboard;
