import { SET_EMPLOYEE, SET_SELECTED_EMPLOYEE, SET_LOADING, SET_SAVING } from "../types/employee";

export default function reducer(
    state = {
        employeeList: [],
        selectedEmployee: {},
        isSaving: false,
        isLoading: false,
    },
    action
) {
    switch (action.type) {
        case SET_EMPLOYEE:
            // Tratando (formatando) os dados
            const temployeeList = action.employeeList;
            temployeeList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                employeeList: temployeeList,
            };
        case SET_SELECTED_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.selectedEmployee,
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
