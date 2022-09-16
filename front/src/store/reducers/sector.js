import { SET_SECTOR, SET_LOADING, SET_SAVING } from "../types/sector";

export default function reducer(
    state = {
        sectorList: [],
        selectedSector: null,
        isSaving: false,
        isLoading: false,
    },
    action
) {
    switch (action.type) {
        case SET_SECTOR:
            //TEMPORARIO - Somente necessário até o backend ser refatorado
            // --------------------------------------------------------------

            // Tratando (formatando) os dados
            const tsectorList = action.sectorList;
            tsectorList.every((sector) => {
                if (typeof sector.ativo === "boolean") {
                    if (sector.ativo === true) {
                        sector.ativo = "1";
                    } else {
                        sector.ativo = "0";
                    }
                }
                return true;
            });

            tsectorList.sort((a, b) => b.id - a.id);

            return {
                ...state,
                sectorList: tsectorList,
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
        // case DELETE:
        //     return {
        //         ...state,
        //         sectorData: {
        //             ...state.sectorData,
        //             ativo: action.active,
        //         },
        //     };
        default:
            break;
    }
    return state;
}
