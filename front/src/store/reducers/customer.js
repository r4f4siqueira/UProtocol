import { SET_CUSTOMER, SET_SELECTED_CUSTOMER, SET_LOADING, SET_SAVING } from "../types/customer";

export default function reducer(
    state = {
        customerList: [],
        selectedCustomer: {},
        isSaving: false,
        isLoading: false,
    },
    action
) {
    switch (action.type) {
        case SET_CUSTOMER:
            // Tratando (formatando) os dados
            const tcustomerList = action.customerList;
            tcustomerList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                customerList: tcustomerList,
            };
        case SET_SELECTED_CUSTOMER:
            return {
                ...state,
                selectedCustomer: action.selectedCustomer,
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
