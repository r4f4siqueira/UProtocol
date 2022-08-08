import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.tsx";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

import PageHeader from "../../components/PageHeader/PageHeader";
import Input from "../../components/Input/Input";
import PlaceboInput from "../../components/PlaceboInput/PlaceboInput";

import { FaUser } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";

import { BtSubmit, ContainerC, ContainerPage, PanelPage, Titles } from "../../styles/styles";
import { AvatarImg, AvatarWrapper, FormWrapper } from "./styles";
import { LinkPassword } from "../Login/styles";

function Profile() {
    const { user, handleUser, forgotPassword } = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();
    const [avatarObj, setAvatarObj] = useState();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setUsername(user.name);
        setAvatar(user.avatar);
    }, []);

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
                        toast.success("Salvo com sucesso!");
                        handleUser({ ...user, ...tuser }, true);
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
    }

    return (
        <ContainerPage>
            <PageHeader title="Perfil do usuário">
                <FaUser size="2rem" color="#1498d5" />
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
                        <BtSubmit>Salvar</BtSubmit>
                    </form>
                    <LinkPassword to="" onClick={handleForgotPass}>
                        Esqueceu a sua senha?
                    </LinkPassword>
                </FormWrapper>
            </PanelPage>
        </ContainerPage>
    );
}

export default Profile;
