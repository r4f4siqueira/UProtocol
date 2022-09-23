import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_CONTACT, SET_LOADING, SET_SELECTED_CONTACT } from "../types/contact";

/**
 * Pega a lista de contatos da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} companyId  ID da empresa que o usuário está tentando buscar os dados
 */
export const getContacts = (uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("buscando contatos");

    api.get(`/contato`, { params: { uid: uid, empresa: companyId } })
        .then(async (resp) => {
            // console.log(resp);
            console.log("contatos encontrados");

            dispatch({
                type: SET_CONTACT,
                contactList: resp.data,
            });
            dispatch(setLoading(false));
        })
        .catch((err) => {
            if (err.response?.data?.erro) {
                toast.error(err.response.data.erro.msg);
            }
            toast.error(err);
            dispatch(setLoading(false));
        });
};

/**
 * Seleciona o funcionário para o formulário
 * @param   {Object} contactData  Funcionário a ser selecionado
 */
export const setSelectedContact = (contactData) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_CONTACT,
        selectedContact: contactData,
    });
};

/**
 * Cria um fucnionario empresa com setor vazio nessa empresa, fica pendente do funcionário aceitar o
 * convite para ser aceito
 * @param   {Object} contactData  Objeto com os dados da empresa  a ser criada
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createContact =
    (contactData: { ativo: String; cliente: Number; telefone: String; email: String; pessoa: String; empresa: Number; uid: String }) => async (dispatch) => {
        dispatch(setSaving(true));
        try {
            api.post(`/contato`, contactData)
                .then(async (resp) => {
                    console.log(resp.data);
                    await dispatch(getContacts(contactData.uid, resp.data.empresa));
                    // addContact(resp.data);
                    // loadContactData();
                    toast.success("Contato criado com sucesso!");
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    toast.error(err);
                });
        } catch (err) {
            console.error(err);
            dispatch(setSaving(false));
        }
    };

/**
 * Atualiza os dados do contato atual
 * @param   {Object} contactData  Objeto com os dados a serem alterados do contato
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updateContact =
    (contactData: { ativo: String; cliente: Number; telefone: String; email: String; pessoa: String; empresa: Number; uid: String; id: Number }) => async (dispatch) => {
        try {
            api.put(`/contato/${contactData.id}`, contactData)
                .then(async () => {
                    // console.log(resp);
                    // loadContactData();
                    await dispatch(getContacts(contactData.uid, contactData.empresa));
                    toast.info("Contato atualizado com sucesso!");
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

/**
 * Deleta o contato
 * @param   {Number} contactID  Id do contato a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} companyId  Id da empresa que o contato de encontra, utilizado para buscar os
 * contatos após a operação
 */
export const deleteContact = (contactID: Number, uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.delete(`/contato/${contactID}`, { params: { uid: uid } })
            .then(async () => {
                await dispatch(getContacts(uid, companyId));
                toast.success("Contato deletado com sucesso!");
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                toast.error(err);
            });
        dispatch(setSaving(false));
    } catch (error) {
        dispatch(setSaving(false));
        console.log(error);
    }
};

/**
 * Muda o estado de carregando
 * @param   {boolean} loading  Booleano que indica para qual estado vai mudar, carregando ou nao carregando
 */
export const setLoading = (loading: Boolean) => (dispatch) => {
    dispatch({
        type: SET_LOADING,
        loading,
    });
};

/**
 * Muda o estado de salvando
 * @param   {boolean} saving  Booleano que indica para qual estado vai mudar, salvando ou nao salvando
 */
export const setSaving = (saving: Boolean) => (dispatch) => {
    dispatch({
        type: SET_LOADING,
        saving,
    });
};
