import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_ACTIVE, SET_COMPANY, SET_LOADING } from "../types/company";

/**
 * Pega os dados da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const getCompany = (uid: String) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("buscando empresa");

    api.get(`/empresa`, { params: { uid } })
        .then(async (resp) => {
            // console.log(resp);
            console.log("empresa encontrada");
            dispatch({
                type: SET_COMPANY,
                company: resp.data,
            });
            dispatch(setLoading(false));
        })
        .catch((err) => {
            if (err.response?.data) {
                console.log(err.response.data);
            }
            console.log(err);
            dispatch(setLoading(false));
        });
};

/**
 * Cria uma nova empresa no banco
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Object} company  Objeto com os dados da empresa  a ser criada
 */
export const createCompany =
    (
        company: {
            ativo: String;
            CNPJ_CPF: String;
            razaosocial: String;
            fantasia: String;
        },
        uid: String
    ) =>
    async (dispatch) => {
        dispatch(setSaving(true));
        if (!(company.ativo === "1" || company.ativo === "0")) {
            throw new Error("Campo ativo deve ser '0' ou '1'");
        }
        try {
            api.post("/empresa", { ...company, uid }).then(async (resp) => {
                if (resp.status === 200) {
                    toast.success("Empresa criada com sucesso!");

                    dispatch({
                        type: SET_COMPANY,
                        company: resp.data,
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
 * @param   {Object} companyData  Objeto com os dados a serem alterados da empresa
 */
export const updateCompany =
    (
        // OBS: Atualmente, companyData deve estar preenchido com todos os dados da empresa atual, junto com a mudança
        companyData: {
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
            api.put(`/empresa/${companyData.id}`, { ...companyData, uid })
                .then(async (resp) => {
                    // console.log(resp);
                    if (resp.status === 200) {
                        toast.success("Empresa editada com sucesso!");
                        dispatch({
                            type: SET_COMPANY,
                            company: resp.data,
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
 * rota dedicada da API para fazer o mesmo, por enquanto o updateCompany faz a mesma coisa
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Boolean} operation  Estado que irá colocar a empresa
 */
export const manageCompany = (uid: String, operation: boolean) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        // api.put(`/empresa/${companyData.id}`, { ...companyData, uid })
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
 * Muda o estado de carregando da empresa
 * @param   {boolean} loading  Booleano que indica para qual estado vai mudar, carregando ou nao carregando
 */
export const setLoading = (loading: Boolean) => (dispatch) => {
    dispatch({
        type: SET_LOADING,
        loading,
    });
};

/**
 * Muda o estado de salvando da empresa
 * @param   {boolean} saving  Booleano que indica para qual estado vai mudar, salvando ou nao salvando
 */
export const setSaving = (saving: Boolean) => (dispatch) => {
    dispatch({
        type: SET_LOADING,
        saving,
    });
};
