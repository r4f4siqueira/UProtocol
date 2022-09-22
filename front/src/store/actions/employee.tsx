import { toast } from "react-toastify";
import api from "../../services/backendAPI";
import { SET_EMPLOYEE, SET_LOADING, SET_SELECTED_EMPLOYEE } from "../types/employee";

/**
 * Pega a lista de funcionarios da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} companyId  ID da empresa que o usuário está tentando buscar os dados
 */
export const getEmployees = (uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("buscando funcionarios");

    api.get(`/funcionarioempresa`, { params: { uid: uid, empresa: companyId } })
        .then(async (resp) => {
            // console.log(resp);
            console.log("funcionarios encontrados");

            dispatch({
                type: SET_EMPLOYEE,
                employeeList: resp.data,
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
 * Seleciona o funcionário para o formulário
 * @param   {Object} employeeData  Funcionário a ser selecionado
 */
export const setSelectedEmployee = (employeeData) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_EMPLOYEE,
        selectedEmployee: employeeData,
    });
};

/**
 * Cria um fucnionario empresa com setor vazio nessa empresa, fica pendente do funcionário aceitar o
 * convite para ser aceito
 * @param   {Object} employeeData  Objeto com os dados da empresa  a ser criada
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createEmployee = (employeeData: { uid: String; email: String; empresa: Number; cargo: String }) => async (dispatch) => {
    dispatch(setSaving(true));

    try {
        api.post(`/funcionarioempresa`, employeeData)
            .then(async () => {
                // console.log(resp.data);

                await dispatch(getEmployees(employeeData.uid, employeeData.empresa));
                // addEmployee(resp.data);
                // loadEmployeeData();
                toast.success("Funcionario convidado com sucesso!");
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
 * Atualiza os dados do funcionario atual
 * @param   {Object} employeeData  Objeto com os dados a serem alterados do funcionario
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updateEmployee = (employeeData: { uid: String; empresa: Number; funcionario: Number; setor: Number; cargo: Number; id: Number }) => async (dispatch) => {
    try {
        console.log(employeeData);
        api.put(`/funcionarioempresa`, employeeData)
            .then(async () => {
                // console.log(resp);
                // loadEmployeeData();
                console.log(employeeData.uid + " - " + employeeData.empresa);
                await dispatch(getEmployees(employeeData.uid, employeeData.empresa));
                toast.info("Funcionario atualizado com sucesso!");
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                toast.error(err);
            });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Deleta o funcionario
 * @param   {Number} employeeID  Id do funcionario a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} companyId  Id da empresa que o funcionario de encontra, utilizado para buscar os
 * funcionarios após a operação
 */
export const deleteEmployee = (employeeID: Number, uid: String, companyId: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.delete(`/funcionarioempresa/${employeeID}`, { params: { uid: uid, empresa: companyId } })
            .then(async () => {
                await dispatch(getEmployees(uid, companyId));
                toast.success("Funcionario deletado com sucesso!");
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
