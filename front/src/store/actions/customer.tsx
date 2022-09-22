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

    // api.get(`/clienteempresa`, { params: { uid: uid, empresa: companyId } })
    //     .then(async (resp) => {
    //         // console.log(resp);
    //         console.log("clientes encontrados");

    //         dispatch({
    //             type: SET_CUSTOMER,
    //             customerList: resp.data,
    //         });
    //         dispatch(setLoading(false));
    //     })
    //     .catch((err) => {
    //         if (err.response.data?.erro) {
    //             console.log(err.response.data.erro.msg);
    //         } else {
    //             console.log(err);
    //         }
    //         dispatch(setLoading(false));
    //     });
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
export const createCustomer = (customerData: { uid: String; email: String; empresa: Number; cargo: String }) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        // api.post(`/clienteempresa`, customerData)
        //     .then(async (resp) => {
        //         console.log(resp.data);
        //         await dispatch(getCustomers(customerData.uid, resp.data.empresa));
        //         // addCustomer(resp.data);
        //         // loadCustomerData();
        //         toast.success("Cliente convidado com sucesso!");
        //     })
        //     .catch((err) => {
        //         if (err.response?.data?.erro) {
        //             toast.error(err.response.data.erro.msg);
        //         }
        //         toast.error(err);
        //     });
    } catch (err) {
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
    (
        customerData: {
            uid: String;
            empresa: Number;
            cliente: Number;
            setor: Number;
            cargo: Number;
            id: Number;
        },
        uid: String
    ) =>
    async (dispatch) => {
        try {
            // api.put(`/clienteempresa`, customerData)
            //     .then(async () => {
            //         // console.log(resp);
            //         // loadCustomerData();
            //         await dispatch(getCustomers(uid, customerData.empresa));
            //         toast.info("Cliente atualizado com sucesso!");
            //     })
            //     .catch((err) => {
            //         if (err.response?.data?.erro) {
            //             toast.error(err.response.data.erro.msg);
            //         }
            //         toast.error(err);
            //     });
        } catch (error) {
            console.log(error);
        }
    };

/**
 * Deleta o cliente
 * @param   {Number} customerID  Id do cliente a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} companyId  Id da empresa que o cliente de encontra, utilizado para buscar os
 * clientes após a operação
 */
export const deleteCustomer = (customerID: Number, uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        // api.delete(`/clienteempresa/${customerID}`, { params: { uid: uid, empresa: companyId } })
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
