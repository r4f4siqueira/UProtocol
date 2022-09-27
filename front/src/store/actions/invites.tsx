import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_INVITE, SET_LOADING } from "../types/invites";

/**
* Busca os convites pendentes do usuário
* @param   {String} uid  UID do usuário que irá realizar a operação

*/
export const getInvites = (uid: String) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("Buscando convites");

    try {
        api.get(`/convite`, { params: { uid } })
            .then(async (resp) => {
                dispatch({
                    type: SET_INVITE,
                    inviteList: resp.data,
                });
                console.log("Convites encontrados");
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
            });
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
    }
};

/**
* Busca os convites pendentes do usuário
* @param   {String} uid  UID do usuário que irá realizar a operação

*/
export const manageInvites = (inviteId: Number, uid: String, resposta: Boolean) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        api.put(`/convite/${inviteId}`, { uid, resposta })
            .then(async (resp) => {
                if (resposta) {
                    toast.success("Convite aceito com sucesso");
                } else {
                    toast.success("Convite recusado com sucesso");
                }
                dispatch(getInvites(uid));
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    } catch (error) {
        dispatch(setLoading(false));
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
