import { SET_PRIORITY, SET_SELECTED_PRIORITY, SET_LOADING, SET_SAVING } from '../types/priority';

export default function reducer(
    state = {
        priorityList: [],
        selectedPriority: {},
        isSaving: false,
        isLoading: false,
    },
    action,
) {
    switch (action.type) {
        case SET_PRIORITY:
            // Tratando (formatando) os dados
            const tpriorityList = action.priorityList;
            tpriorityList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                priorityList: tpriorityList,
            };
        case SET_SELECTED_PRIORITY:
            return {
                ...state,
                selectedPriority: action.selectedPriority,
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
        default:
            break;
    }
    return state;
}
