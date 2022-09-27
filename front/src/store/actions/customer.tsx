import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_CUSTOMER, SET_LOADING, SET_SELECTED_CUSTOMER } from "../types/customer";

/**
 * Pega a lista de clientes da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} companyId  ID da empresa que o usuário está tentando buscar os dados
 */
export const getCustomers = (uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("buscando clientes");

    api.get(`/cliente`, { params: { uid: uid, empresa: companyId } })
        .then(async (resp) => {
            // console.log(resp);
            console.log("clientes encontrados");

            dispatch({
                type: SET_CUSTOMER,
                customerList: resp.data,
            });
            dispatch(setLoading(false));
        })
        .catch((err) => {
            if (err.response?.data?.erro) {
                toast.error(err.response.data.erro.msg);
            }
            console.error(err);
            dispatch(setLoading(false));
        });
};

/**
 * Seleciona o funcionário para o formulário
 * @param   {Object} customerData  Funcionário a ser selecionado
 */
export const setSelectedCustomer = (customerData) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_CUSTOMER,
        selectedCustomer: customerData,
    });
};

/**
 * Cria um fucnionario empresa com setor vazio nessa empresa, fica pendente do funcionário aceitar o
 * convite para ser aceito
 * @param   {Object} customerData  Objeto com os dados da empresa  a ser criada
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createCustomer =
    (customerData: { ativo: String; razaosocial: String | null; fantasia: String; CNPJ_CPF: String | null; uid: String; empresa: Number }) => async (dispatch) => {
        dispatch(setSaving(true));
        try {
            api.post(`/cliente`, customerData)
                .then(async (resp) => {
                    console.log(resp.data);
                    await dispatch(getCustomers(customerData.uid, resp.data.empresa));
                    // addCustomer(resp.data);
                    // loadCustomerData();
                    toast.success("Cliente convidado com sucesso!");
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    console.error(err);
                });
        } catch (err) {
            if (err.response?.data?.erro) {
                toast.error(err.response.data.erro.msg);
            }
            console.error(err);
            dispatch(setSaving(false));
        }
    };

/**
 * Atualiza os dados do cliente atual
 * @param   {Object} customerData  Objeto com os dados a serem alterados do cliente
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updateCustomer =
    (customerData: { id: Number; ativo: String; razaosocial: String | null; fantasia: String; CNPJ_CPF: String | null; uid: String; idEmpresa: Number }) =>
    async (dispatch) => {
        try {
            api.put(`/cliente/${customerData.id}`, customerData)
                .then(async () => {
                    // console.log(resp);
                    // loadCustomerData();
                    await dispatch(getCustomers(customerData.uid, customerData.idEmpresa));
                    toast.info("Cliente atualizado com sucesso!");
                })
                .catch((err) => {
                    if (err.response?.data?.erro) {
                        toast.error(err.response.data.erro.msg);
                    }
                    console.error(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

/**
 * Deleta o cliente
 * @deprecated Cliente nao pode ser deletado, no momento a funcao nao faz nada
 * @param   {Number} customerID  Id do cliente a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} companyId  Id da empresa que o cliente de encontra, utilizado para buscar os
 * clientes após a operação
 */
export const deleteCustomer = (customerID: Number, uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        // api.delete(`/cliente/${customerID}`, { params: { uid: uid, empresa: companyId } })
        //     .then(async () => {
        //         await dispatch(getCustomers(uid, companyId));
        //         toast.success("Cliente deletado com sucesso!");
        //     })
        //     .catch((err) => {
        //         if (err.response?.data?.erro) {
        //             toast.error(err.response.data.erro.msg);
        //         }
        //         toast.error(err);
        //     });
        dispatch(setSaving(false));
    } catch (err) {
        if (err.response?.data?.erro) {
            toast.error(err.response.data.erro.msg);
        }
        console.error(err);
        dispatch(setSaving(false));
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
