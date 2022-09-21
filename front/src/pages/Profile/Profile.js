import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.tsx";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import PlaceboInput from "../../components/PlaceboInput/PlaceboInput";
import { ReactComponent as Loading } from "../../assets/Loading/Gear.svg";

import { FaUser } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";

import { BtsContainer, BtSubmit, ContainerC, ContainerPage, ContainerR, PanelPage, Titles, FormWrapper } from "../../styles/styles";
import { AvatarImg, AvatarWrapper, BtDAccount } from "./styles";
import { LinkPassword } from "../Login/styles";

function Profile() {
    const { user, handleUser, forgotPassword, manageAccount } = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();
    const [avatarObj, setAvatarObj] = useState();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setUsername(user.name);
        setAvatar(user.avatar);
    }, []);

    // console.log(user);
    // console.log(username + " - " + avatar);
    const isDisabled = username === user.name && avatar === user.avatar;
    // console.log(isDisabled);

    function handleForgotPass() {
        forgotPassword(user.email);
    }

    function handleChangeImg(e) {
        //e.target.files[0]
        // console.log("bomdia");
        if (e.target.files[0] !== undefined) {
            if (e.target.files[0].size < 8388608) {
                setAvatarObj(e.target.files[0]);
                const imgUrl = URL.createObjectURL(e.target.files[0]);
                setAvatar(imgUrl);
            } else {
                toast.error("Arquivo muito grande! escolha uma imagem com menos de 8mb");
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(avatarObj);
        setSaving(true);
        // console.log("avatar: " + avatar + " - " + user.avatar);
        if (avatar !== user.avatar) {
            await firebase
                .storage()
                .ref("avatares/" + user.uid + "/" + avatarObj.name)
                .put(avatarObj)
                .then(async (snapshot) => {
                    // console.log(snapshot);
                    let tuser = { avatar: await snapshot.ref.getDownloadURL() };
                    if (username !== user.name) {
                        tuser = { ...tuser, name: username };
                    }
                    await firebase
                        .firestore()
                        .collection("usuarios")
                        .doc(user.uid)
                        .update(tuser)
                        .then(() => {
                            handleUser({ ...user, ...tuser }, true, true);
                            setSaving(false);
                        })
                        .catch((err) => {
                            toast.error("Erro ao salvar");
                            console.log(err);
                            setSaving(false);
                        });
                })
                .catch((err) => {
                    toast.error("Ocorreu um erro!");
                    console.log(err);
                    setSaving(false);
                });
        } else {
            if (username !== user.name) {
                let tuser = { name: username };
                await firebase
                    .firestore()
                    .collection("usuarios")
                    .doc(user.uid)
                    .update(tuser)
                    .then(() => {
                        handleUser({ ...user, ...tuser }, true, true);
                        setSaving(false);
                    })
                    .catch((err) => {
                        toast.error("Erro ao salvar");
                        console.log(err);
                        setSaving(false);
                    });
            } else {
                toast.error("Erro inesperado");
                setSaving(false);
            }
        }
    }

    function handleDeactivateAccount() {
        const msg = window.prompt("Você tem certeza que deseja desativar sua conta? ela não poderá mais acessar o sistema, se tiver certeza, digite 'Eu compreendo'");
        if (msg.toLowerCase() === "eu compreendo") {
            manageAccount(false, user.uid);
        }
    }

    return (
        <ContainerPage>
            <PageHeader title="Perfil do usuário">
                <FaUser className="icon" />
            </PageHeader>
            <PanelPage>
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                        <Titles>
                            <h2>Avatar:</h2>
                        </Titles>
                        <ContainerC>
                            <AvatarWrapper>
                                <input
                                    onChange={(e) => {
                                        handleChangeImg(e);
                                    }}
                                    type="file"
                                    accept="image/*"
                                />
                                <BsUpload size="2rem" />
                                <AvatarImg src={avatar} />
                            </AvatarWrapper>
                        </ContainerC>

                        <Input
                            label="Nome:"
                            placeholder="Nome do usuário"
                            inputValue={username}
                            ocHandler={(e) => {
                                setUsername(e.target.value);
                            }}
                            isValid={null}
                        />
                        <PlaceboInput
                            label="Email:"
                            placeholder="Email do usuário"
                            inputValue={user.email}
                            ocHandler={(e) => {
                                setUsername(e.target.value);
                            }}
                            isValid={null}
                        />
                        <ContainerR>
                            <BtSubmit disabled={saving ? true : isDisabled}>{saving ? "Salvando..." : "Salvar"}</BtSubmit>
                            {saving ? <Loading className="loading" /> : ""}
                        </ContainerR>
                    </form>
                    <BtsContainer>
                        <LinkPassword to="" onClick={handleForgotPass}>
                            Alterar senha
                        </LinkPassword>
                        <BtDAccount onClick={handleDeactivateAccount}>Desativar conta</BtDAccount>
                    </BtsContainer>
                </FormWrapper>
            </PanelPage>
        </ContainerPage>
    );
}

export default Profile;
