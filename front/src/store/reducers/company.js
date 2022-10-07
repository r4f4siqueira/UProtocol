import { SET_ACTIVE, SET_COMPANY, SET_LOADING, SET_SAVING } from '../types/company';

export default function reducer(
    state = {
        companyData: null,
        hasCompany: null,
        isSaving: false,
        isLoading: false,
    },
    action,
) {
    switch (action.type) {
        case SET_COMPANY:
            //TEMPORARIO - Somente necessário até o backend ser refatorado
            // --------------------------------------------------------------

            // Tratando (formatando) os dados da empresa
            const tcompany = action.companyData;
            let hasCompany = false;
            if (tcompany !== null) {
                hasCompany = true;

                tcompany.created_at = tcompany.created_at.substring(0, 10);
                tcompany.CNPJ_CPF = tcompany.CNPJ_CPF === null ? '' : tcompany.CNPJ_CPF;

                if (typeof tcompany.ativo === 'boolean') {
                    if (tcompany.ativo === true) {
                        tcompany.ativo = '1';
                    } else {
                        tcompany.ativo = '0';
                    }
                }
            }
            return {
                ...state,
                companyData: tcompany,
                hasCompany: hasCompany,
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
        case SET_ACTIVE:
            return {
                ...state,
                companyData: {
                    ...state.companyData,
                    ativo: action.active,
                },
            };
        default:
            break;
    }
    return state;
}
