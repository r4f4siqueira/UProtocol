import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../context/auth.tsx';
import { createPriority, setSelectedPriority, updatePriority } from '../../store/actions/priority.tsx';

import Input from '../../components/Input/Input';

import { BtCancel, BtSubmit, Titles } from '../../styles/styles';
import { PriorityFormWrapper, FormPrioritys as PrioritysForm } from './styles';

function FormPriorities() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedPriority = useSelector((state) => state.Priority.selectedPriority);
    const sectorList = useSelector((state) => state.Sector.sectorList);

    const { user } = useContext(AuthContext);

    const [localSelectedPriority, setLocalSelectedPriority] = useState();

    const disableSubmit =
        localSelectedPriority?.nome === undefined ||
        localSelectedPriority?.nome === '' ||
        localSelectedPriority?.nome === null ||
        localSelectedPriority?.ordemimportancia === undefined ||
        localSelectedPriority?.ordemimportancia === '' ||
        localSelectedPriority?.ordemimportancia === null;

    useEffect(() => {
        setLocalSelectedPriority({
            ...selectedPriority,
            ativo: selectedPriority.ativo ? '1' : '0',
        });
    }, [selectedPriority]);

    function handleCancelPriority() {
        setLocalSelectedPriority({ nome: null, ordemimportancia: null, ativo: '1' });
        dispatch(setSelectedPriority({ nome: null, ordemimportancia: null, ativo: '1' }));
    }

    async function handlePriority(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (localSelectedPriority?.id) {
            const data = {
                id: localSelectedPriority.id,
                ativo: localSelectedPriority.ativo,
                nome: localSelectedPriority.nome,
                ordemimportancia: localSelectedPriority.ordemimportancia,
                uid: user.uid,
                empresa: companyId,
            };
            console.log('editar');
            console.log(data);
            await dispatch(updatePriority(data));
            handleCancelPriority();
        } else {
            // se nao existir ID, criar
            console.log(localSelectedPriority);
            const data = {
                ativo: localSelectedPriority.ativo,
                nome: localSelectedPriority.nome,
                ordemimportancia: localSelectedPriority.ordemimportancia,
                uid: user.uid,
                empresa: companyId,
            };
            console.log('criar');
            console.log(data);
            await dispatch(createPriority(data));
            handleCancelPriority();
        }
    }

    return (
        <PrioritysForm className={localSelectedPriority?.id ? 'edit' : ''}>
            <Titles>{localSelectedPriority?.id && `Selecionado: id - ${localSelectedPriority?.id} | ${localSelectedPriority?.nome} `}</Titles>
            <PriorityFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handlePriority(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="input">
                            <Input
                                label="Nome:*"
                                noMargin={true}
                                placeholder="Nome da prioridade"
                                inputValue={localSelectedPriority?.nome}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedPriority({ ...localSelectedPriority, nome: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="Ordem de importância:*"
                                noMargin={true}
                                placeholder="Menor o número, mais importante"
                                inputValue={localSelectedPriority?.ordemimportancia}
                                isValid={null}
                                type="number"
                                ocHandler={(e) => {
                                    setLocalSelectedPriority({ ...localSelectedPriority, ordemimportancia: e.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <Titles>
                                <label>Ativo: </label>
                            </Titles>
                            <input
                                className="ativo"
                                type="checkbox"
                                checked={localSelectedPriority?.ativo === '1' ? true : false}
                                onChange={(e) => {
                                    setLocalSelectedPriority({ ...localSelectedPriority, ativo: e.target.checked ? '1' : '0' });
                                }}
                            />
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel
                            type="button"
                            onClick={handleCancelPriority}
                        >
                            Cancelar
                        </BtCancel>
                        <BtSubmit
                            disabled={disableSubmit}
                            type="submit"
                        >
                            {localSelectedPriority?.id ? 'Editar' : 'Gravar'}
                        </BtSubmit>
                    </div>
                </form>
            </PriorityFormWrapper>
        </PrioritysForm>
    );
}

export default FormPriorities;
