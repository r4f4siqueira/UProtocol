import { SET_PROTOCOL, SET_SELECTED_PROTOCOL, SET_LOADING, SET_SAVING, SET_TRANSFERS } from '../types/protocol';

export default function reducer(
    state = {
        protocolList: [],
        selectedProtocol: {},
        selectedTransfers: [],
        selectedAttachments: [],
        isSaving: false,
        isLoading: false,
    },
    action,
) {
    switch (action.type) {
        case SET_PROTOCOL:
            // Tratando (formatando) os dados
            let tprotocolList = action.protocolList;
            // tprotocolList.sort((a, b) => b.id - a.id);
            if (action.filter) {
                switch (action.filter) {
                    case 'queue':
                        tprotocolList = tprotocolList.filter((protocol) => protocol.atendente.id == null);
                        break;
                    case 'finished':
                        // eslint-disable-next-line eqeqeq
                        tprotocolList = tprotocolList.filter((protocol) => protocol.situacao == 'C');
                        break;
                    default:
                        break;
                }
            }
            return {
                ...state,
                protocolList: tprotocolList,
            };
        case SET_SELECTED_PROTOCOL:
            return {
                ...state,
                selectedProtocol: action.selectedProtocol,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.loading,
            };
        case SET_SAVING:
            return {
                ...state,
                isSaving: action.saving,
            };
        case SET_TRANSFERS:
            return {
                ...state,
                selectedTransfers: action.transferList,
            };
        default:
            break;
    }
    return state;
}
