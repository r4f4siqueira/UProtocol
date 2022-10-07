import { toast } from 'react-toastify';
import api from '../../services/backendAPI';
import { SET_PRIORITY, SET_LOADING, SET_SELECTED_PRIORITY } from '../types/priority';

/**
 * Pega a lista de prioridades da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} empresa  ID da empresa que o usuário está tentando buscar os dados
 */
export const getPriorities = (uid: String, empresa: Number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log('buscando prioridades');

    api.get(`/prioridade`, { params: { uid, empresa } })
        .then(async (resp) => {
            // console.log(resp);
            console.log('prioridades encontradas');

            dispatch({
                type: SET_PRIORITY,
                priorityList: resp.data,
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
 * Seleciona a entidade para o formulário
 * @param   {Object} priorityData  Funcionário a ser selecionado
 */
export const setSelectedPriority = (priorityData) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_PRIORITY,
        selectedPriority: priorityData,
    });
};

/**
 * Cria a entidade no banco de dados e atualiza a lista
 * @param   {Object} priorityData  Objeto com os dados da empresa  a ser criada
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createPriority = (priorityData: { ativo: String; nome: String; ordemimportancia: Number; empresa: Number; uid: String }) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.post(`/prioridade`, priorityData)
            .then(async (resp) => {
                console.log(resp.data);
                await dispatch(getPriorities(priorityData.uid, resp.data.empresa));
                // addPriority(resp.data);
                // loadPriorityData();
                toast.success('Prioridade criada com sucesso!');
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
            });
    } catch (err) {
        console.error(err);
        dispatch(setSaving(false));
    }
};

/**
 * Atualiza os dados do prioridade atual
 * @param   {Object} priorityData  Objeto com os dados a serem alterados do prioridade
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updatePriority = (priorityData: { id: Number; ativo: String; nome: String; ordemimportancia: Number; empresa: Number; uid: String }) => async (dispatch) => {
    try {
        api.put(`/prioridade/${priorityData.id}`, priorityData)
            .then(async () => {
                // console.log(resp);
                // loadPriorityData();
                await dispatch(getPriorities(priorityData.uid, priorityData.empresa));
                toast.info('Prioridade atualizada com sucesso!');
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
 * Deleta o prioridade
 * @param   {Number} priorityID  Id do prioridade a ser deletado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} empresa  Id da empresa que o prioridade de encontra, utilizado para buscar os
 * prioridades após a operação
 */
export const deletePriority = (priorityID: Number, uid: String, empresa: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.delete(`/prioridade/${priorityID}`, { params: { uid, empresa } })
            .then(async () => {
                await dispatch(getPriorities(uid, empresa));
                toast.success('Prioridade deletada com sucesso!');
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
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
