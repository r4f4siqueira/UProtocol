import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../services/backendAPI';
import { SET_PROTOCOL, SET_LOADING, SET_SELECTED_PROTOCOL, SET_TRANSFERS, SET_ATTACHMENTS } from '../types/protocol';
import firebase from '../../services/firebaseConnection';

interface protocolData {
    id?: number;
    uid: string;
    empresa: number;
    cliente: number;
    prioridade: number;
    setor: number;
    pessoaatendida: string;
    motivo: string;
    previsao: Date;
}

/**
 * Pega a lista de protocolos da empresa que o usuário se encontra
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} empresa  ID da empresa que o usuário está tentando buscar os dados
 * @param   {Number} filter  parâmetro para definir se irá filtrar os protocolos abertos, fila ou concluídos
 */
export const getProtocols = (uid: String, empresa: Number, filter?: String) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log('buscando protocolos');

    api.get(`/protocolo`, { params: { uid, empresa } })
        .then(async (resp) => {
            // console.log(resp);
            console.log('protocolos encontrados');

            dispatch({
                type: SET_PROTOCOL,
                protocolList: resp.data,
                filter,
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
 * Pega a lista de protocolos da empresa que o usuário se encontra baseado nos filtros de setor e data
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} empresa  ID da empresa que o usuário está tentando buscar os dados
 * @param   {String} filter  parâmetro para definir se irá filtrar os protocolos abertos, fila ou concluídos
 * @param   {Object} searchParams  parâmetros de busca da lista de protocolos
 */

/*
    uid , empresa , datainicial , datafinal , setor
*/
export const searchProtocols = (uid: String, empresa: Number, filter?: String, searchParams?: { datainicial?; datafinal?; setor? }) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log('buscando protocolos');

    if (searchParams) {
        api.get(`/protocolo/search`, { params: { uid, empresa, ...searchParams } })
            .then(async (resp) => {
                // console.log(resp);
                console.log('protocolos encontrados');

                dispatch({
                    type: SET_PROTOCOL,
                    protocolList: resp.data,
                    filter,
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
    } else {
        dispatch(getProtocols(uid, empresa));
    }
};
/**
 * Pega os dados de um protocolo informado por parâmetro
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} empresa  ID da empresa que o usuário está tentando buscar os dados
 */
export const getProtocolDetails = (uid: String, empresa: Number, idProtocol: number) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log('buscando detalhes do protocolo');

    api.get(`/protocolo/${idProtocol}`, { params: { uid, empresa } })
        .then(async (resp) => {
            console.log('detalhes do protocolo encontrados:');
            console.log(resp);
            // resposta vem em um array de uma posição com os detalhes do protocolo
            dispatch(setSelectedProtocol(resp.data[0]));
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
 * Cria um registro de observação no protocolo
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {Number} empresa  ID da empresa que o usuário está tentando buscar os dados
 * @param   {Number} protocolo  ID do protocolo
 * @param   {Number} observacao  String contendo o que foi observado
 */
export const observeProtocol = (uid: String, empresa: Number, protocolo: number, observacao: string) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log('Salvando observacao');

    api.post(`/observacao`, { uid, empresa, protocolo, observacao })
        .then(async () => {
            console.log('Observacao salva');
            toast.success('Observacao registrada com sucesso!');

            dispatch(getProtocolDetails(uid, empresa, protocolo));
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
 * @param   {Object} protocolData  entidade a ser selecionada
 */
export const setSelectedProtocol = (protocolData) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_PROTOCOL,
        selectedProtocol: protocolData,
    });
};

/**
 * Cria a entidade no banco de dados e atualiza a lista
 * @param   {Object} protocolData  Objeto com os dados da empresa  a ser criado
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const createProtocol = (protocolData: protocolData) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.post(`/protocolo`, protocolData)
            .then(async (resp) => {
                console.log(resp.data);
                await dispatch(getProtocols(protocolData.uid, resp.data.empresa));
                dispatch(setSelectedProtocol(resp.data));

                toast.success('Protocolo criado com sucesso!');
                dispatch(setSaving(false));
                return resp.data.id;
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
                dispatch(setSaving(false));
            });
    } catch (err) {
        console.error(err);
        dispatch(setSaving(false));
    }
};

/**
 * Atualiza os dados do protocolo atual
 * @param   {Object} protocolData  Objeto com os dados a serem alterados do protocolo
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const updateProtocol = (protocolData: protocolData) => async (dispatch) => {
    try {
        api.put(`/protocolo/${protocolData.id}`, protocolData)
            .then(async (resp) => {
                console.log(resp);

                await dispatch(getProtocols(protocolData.uid, protocolData.empresa));
                if (protocolData.id) {
                    await dispatch(getProtocolDetails(protocolData.uid, protocolData.empresa, protocolData.id));
                }
                toast.info('Protocolo atualizado com sucesso!');
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
 * Atualiza os dados do protocolo atual
 * @param   {Object} protocolData  Objeto com os dados a serem alterados do protocolo
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const commitProtocol = (uid: string, empresa: number, protocolId: number) => async (dispatch) => {
    try {
        api.post(`/protocolo/concluir/${protocolId}`, { uid, empresa })
            .then(async (resp) => {
                // console.log(resp);
                // loadProtocolData();
                await dispatch(getProtocols(uid, empresa));
                await dispatch(getProtocolDetails(uid, empresa, protocolId));
                toast.success('Protocolo concluído com sucesso!');
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
 * Repassa o protocolo
 * @param   {Object} transferData  Objeto com os dados a serem criados no repasse
 * @param   {String} uid  UID do usuário que irá realizar a operação
 */
export const transferProtocol =
    (transferData: { uid: string; empresa: number; protocolo: number; funcionariodestino: number; setor: number }) => async (dispatch) => {
        try {
            api.post(`/repasse`, transferData)
                .then(async () => {
                    // console.log('dados busca: ' + transferData.uid + ' - ' + transferData.empresa + ' - ' + transferData.protocolo);

                    await dispatch(getTransfers(transferData.uid, transferData.empresa, transferData.protocolo));
                    await dispatch(getProtocolDetails(transferData.uid, transferData.empresa, transferData.protocolo));
                    toast.info('Repasse realizado com sucesso!');
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
 * Lista os repasses do protocolo
 */
export const getTransfers = (uid: string, empresa: number, protocolo: number) => async (dispatch) => {
    try {
        console.log('Buscando Repasses');

        dispatch(setLoading(true));
        api.get(`/repasse`, { params: { uid, empresa, protocolo } })
            .then(async (resp) => {
                console.log('Repasses encontrados');
                console.log(resp.data);

                dispatch({
                    type: SET_TRANSFERS,
                    transferList: resp.data,
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
    } catch (error) {
        console.log(error);
    }
};

/**
 * Lista os anexos do protocolo
 */
export const getAttachments = (uid: string, empresa: number, protocolo: number) => async (dispatch) => {
    try {
        console.log('Buscando Anexos');

        dispatch(setLoading(true));
        api.get(`/anexo`, { params: { uid, empresa, protocolo } })
            .then(async (resp) => {
                console.log('Anexos encontrados');
                console.log(resp.data);

                dispatch({
                    type: SET_ATTACHMENTS,
                    attachmentList: resp.data,
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
    } catch (error) {
        console.log(error);
    }
};
/**
 * Cria um anexo novo no protocolo
 */
export const createAttachment = (attachmentData: { protocolo: number; descricao: string; uid: string; empresa: number }, objAnexo: any) => async (dispatch) => {
    try {
        console.log('Criando anexo');
        dispatch(setLoading(true));
        let tAnexo;
        toast.info('Fazendo o upload do Anexo... isso pode demorar alguns segundos', { autoClose: false, toastId: 'infoUpload' });
        await firebase
            .storage()
            .ref(`anexos/${attachmentData.empresa}/${attachmentData.protocolo}/${objAnexo.name}`)
            .put(objAnexo)
            .then(async (snapshot) => {
                // console.log(snapshot);
                tAnexo = await snapshot.ref.getDownloadURL();
            })
            .catch((err) => {
                toast.error('Erro ao salvar imagem');
                console.log(err);
                setSaving(false);
            });

        api.post(`/anexo`, { ...attachmentData, anexo: tAnexo })
            .then(async (resp) => {
                console.log(resp.data);
                toast.dismiss('infoUpload');
                toast.success('Anexo criado com sucesso!');

                dispatch(getAttachments(attachmentData.uid, attachmentData.empresa, attachmentData.protocolo));
                dispatch(setLoading(false));
            })
            .catch((err) => {
                if (err.response?.data?.erro) {
                    toast.error(err.response.data.erro.msg);
                }
                console.error(err);
                dispatch(setLoading(false));
            });
    } catch (error) {
        console.log(error);
    }
};

export const deleteAttachment = (attachmentId: number, uid: string, empresa: number, protocolo: number) => async (dispatch) => {
    api.delete(`/anexo/${attachmentId}`, { params: { uid, empresa } })
        .then(async () => {
            await dispatch(getAttachments(uid, empresa, protocolo));
            toast.success('Anexo deletado com sucesso!');
        })
        .catch((err) => {
            if (err.response?.data?.erro) {
                toast.error(err.response.data.erro.msg);
            }
            console.error(err);
        });
};

/**
 * pega os detalhes de um protocolo, como seus repasses e observações
 * @param   {Number} protocolID  Id do protocolo
 * @param   {String} uid  UID do usuário que irá realizar a operação
 * @param   {String} empresa  Id da empresa que o protocolo de encontra, utilizado para buscar os
 * protocolos após a operação
 */
export const detailsProtocol = (protocolID: Number, uid: String, empresa: Number) => async (dispatch) => {
    dispatch(setSaving(true));
    try {
        api.get(`/protocolo/${protocolID}`, { params: { uid, empresa } })
            .then(async (resp) => {
                await dispatch(setSelectedProtocol(resp.data));
                // toast.success('Protocolo deletada com sucesso!');
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
