import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_SECTOR, SET_LOADING } from "../types/sector";

/**
 * Pega a lista de setores da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {number} companyId  ID da empresa que o usuário está tentando buscar os dados
 */
export const getSectors = (uid: String, companyId: number) => async (dispatch) => {
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
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Object} sector  Objeto com os dados da empresa  a ser criada
 */
export const createSector =
    (
        sector: {
            ativo: String;
            CNPJ_CPF: String;
            razaosocial: String;
            fantasia: String;
        },
        uid: String
    ) =>
    async (dispatch) => {
        dispatch(setSaving(true));
        if (!(sector.ativo === "1" || sector.ativo === "0")) {
            throw new Error("Campo ativo deve ser '0' ou '1'");
        }
        try {
            api.post("/empresa", { ...sector, uid }).then(async (resp) => {
                if (resp.status === 200) {
                    toast.success("Empresa criada com sucesso!");

                    dispatch({
                        type: SET_SECTOR,
                        sectorData: resp.data,
                    });

                    dispatch(setSaving(false));
                }
            });
        } catch (err) {
            console.error(err);
            dispatch(setSaving(false));
        }
    };

/**
 * Atualiza os dados da empresa atual
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Object} sectorData  Objeto com os dados a serem alterados da empresa
 */
export const updateSector =
    (
        // OBS: Atualmente, sectorData deve estar preenchido com todos os dados da empresa atual, junto com a mudança
        sectorData: {
            id: Number;
            ativo: String;
            CNPJ_CPF: String;
            razaosocial: String;
            fantasia: String;
            // PENDENTE - verificar posteriormente se o campo criador é removido do banco se remover
            // ele da request 👇
            criador: Number;
        },
        uid: String
    ) =>
    async (dispatch) => {
        try {
            api.put(`/empresa/${sectorData.id}`, { ...sectorData, uid })
                .then(async (resp) => {
                    // console.log(resp);
                    if (resp.status === 200) {
                        toast.success("Empresa editada com sucesso!");
                        dispatch({
                            type: SET_SECTOR,
                            sectorData: resp.data,
                        });
                        dispatch(setSaving(false));
                    }
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    console.error(err);
                    dispatch(setSaving(false));
                });
        } catch (error) {
            console.log(error);
        }
    };

/**
 * Desativa/Ativa a empresa
 * @deprecated Não é necessário desativar/ativar empresa em uma chamada separada até que exista uma
 * rota dedicada da API para fazer o mesmo, por enquanto o updateSector faz a mesma coisa
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Boolean} operation  Estado que irá colocar a empresa
 */
export const manageSector = (uid: String, operation: boolean) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        // api.put(`/empresa/${sectorData.id}`, { ...sectorData, uid })
        // dispatch({
        //     type: SET_ACTIVE,
        //     active: operation,
        // });
        console.log("Funcão não está em funcionamento agora");

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
