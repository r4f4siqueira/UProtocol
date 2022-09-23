import { SET_INVITE, SET_LOADING } from "../types/invites";

export default function reducer(
    state = {
        inviteList: [],
        isLoading: false,
    },
    action
) {
    switch (action.type) {
        case SET_INVITE:
            // Tratando (formatando) os dados
            const tinviteList = action.inviteList;
            tinviteList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                inviteList: tinviteList,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.loading,
            };
        default:
            break;
    }
    return state;
}
