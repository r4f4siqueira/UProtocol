import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.tsx";
import { ContainerPage } from "../../styles/styles";
import { BtLogout } from "./styles";
function Dashboard() {
    const { logout, user } = useContext(AuthContext);

    // console.log(user);

    function handleLogout() {
        // console.log(user);
        logout();
    }

    const AsyncImage = (props) => {
        const [loadedSrc, setLoadedSrc] = useState(null);
        React.useEffect(() => {
            setLoadedSrc(null);
            if (props.src) {
                const handleLoad = () => {
                    setLoadedSrc(props.src);
                };
                const image = new Image();
                image.addEventListener("load", handleLoad);
                image.src = props.src;
                return () => {
                    image.removeEventListener("load", handleLoad);
                };
            }
        }, [props.src]);
        if (loadedSrc === props.src) {
            return <img {...props} />;
        }
        return null;
    };

    return (
        <ContainerPage>
            <p>pagina dashboard</p>
            <AsyncImage alt="imagem usuario" referrerPolicy="no-referrer" src={user.avatar} />
            <BtLogout onClick={handleLogout}>Deslogar</BtLogout>
        </ContainerPage>
    );
}

export default Dashboard;
