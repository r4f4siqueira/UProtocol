import { SET_CONTACT, SET_SELECTED_CONTACT, SET_LOADING, SET_SAVING } from "../types/contact";

export default function reducer(
    state = {
        contactList: [],
        selectedContact: {},
        isSaving: false,
        isLoading: false,
    },
    action
) {
    switch (action.type) {
        case SET_CONTACT:
            // Tratando (formatando) os dados
            const tcontactList = action.contactList;
            tcontactList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                contactList: tcontactList,
            };
        case SET_SELECTED_CONTACT:
            return {
                ...state,
                selectedContact: action.selectedContact,
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
