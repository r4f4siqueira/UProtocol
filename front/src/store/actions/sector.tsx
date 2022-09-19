import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_SECTOR, SET_LOADING } from "../types/sector";

/**
 * Pega a lista de setores da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} companyId  ID da empresa que o usuário está tentando buscar os dados
 */
export const getSectors = (uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("buscando setores");

    api.get(`/setor/${companyId}`, { params: { uid: uid } })
        .then(async (resp) => {
            // console.log(resp);
            console.log("setores encontrados");
            dispatch({
                type: SET_SECTOR,
                sectorList: resp.data,
            });
            dispatch(setLoading(false));
        })
        .catch((err) => {
            if (err.response.data?.erro) {
                console.log(err.response.data.erro.msg);
            } else {
                console.log(err);
            }
            dispatch(setLoading(false));
        });
};

/**
 * Cria uma nova empresa no banco
 * @param   {Object} sectorData  Objeto com os dados da empresa  a ser criada
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createSector =
    (
        sectorData: {
            id: Number;
            ativo: String;
            nome: String;
            uid: String;
            empresa: Number;
        },
        uid: String
    ) =>
    async (dispatch) => {
        dispatch(setSaving(true));
        if (!(sectorData.ativo === "1" || sectorData.ativo === "0")) {
            throw new Error("Campo ativo deve ser '0' ou '1'");
        }
        try {
            api.post(`/setor`, { ...sectorData, uid })
                .then(async (resp) => {
                    console.log(resp.data);
                    await dispatch(getSectors(uid, resp.data.empresa));
                    // addSector(resp.data);
                    // loadSectorData();
                    toast.success("Setor criado com sucesso!");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.error(err);
            dispatch(setSaving(false));
        }
    };

/**
 * Atualiza os dados do setor atual
 * @param   {Object} sectorData  Objeto com os dados a serem alterados do setor
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updateSector =
    (
        sectorData: {
            id: Number;
            ativo: String;
            nome: String;
            uid: String;
            empresa: Number;
        },
        uid: String
    ) =>
    async (dispatch) => {
        try {
            api.put(`/setor/${sectorData.id}`, sectorData)
                .then(async () => {
                    // console.log(resp);
                    // loadSectorData();
                    await dispatch(getSectors(uid, sectorData.empresa));
                    toast.info("Setor editado com sucesso!");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

/**
 * Deleta o setor
 * @param   {Number} sectorID  Id do setor a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} companyId  Id da empresa que o setor de encontra, utilizado para buscar os
 * setores após a operação
 */
export const deleteSector = (sectorID: Number, uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    console.log(sectorID + " - " + companyId + " - " + uid);

    try {
        api.delete(`/setor/${sectorID}`, { params: { uid: uid, empresa: companyId } })
            .then(async () => {
                await dispatch(getSectors(uid, companyId));
                toast.success("Setor deletado com sucesso!");
            })
            .catch((err) => {
                console.log(err);
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
