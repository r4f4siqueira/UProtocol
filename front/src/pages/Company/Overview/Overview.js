import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createCompany, updateCompany } from '../../../store/actions/company.tsx';
import { AuthContext } from '../../../context/auth.tsx';

import { BtCancel, BtSubmit, ContainerBTW, ContainerCenter, ContainerR, Titles } from '../../../styles/styles';
import { CompanyFormWrapper, CompanyOverview, Details, FormButtonsWrapper } from '../styles';
import Input from '../../../components/Input/Input';

function Overview() {
    const dispatch = useDispatch();

    const OriginalCompany = useSelector((state) => state.Company);
    const { user } = useContext(AuthContext);

    const [company, setCompany] = useState();

    const isDisabled =
        OriginalCompany.companyData?.razaosocial === company?.razaosocial &&
        OriginalCompany.companyData?.fantasia === company?.fantasia &&
        OriginalCompany.companyData?.CNPJ_CPF === company?.CNPJ_CPF &&
        OriginalCompany.companyData?.ativo === company?.ativo;

    // eslint-disable-next-line no-useless-escape
    const CNPJ_CPF_REX = /(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)|(^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$)/;
    const hasError = company?.CNPJ_CPF === '' ? false : !CNPJ_CPF_REX.test(company?.CNPJ_CPF);

    useEffect(() => {
        if (OriginalCompany.hasCompany) {
            setCompany(OriginalCompany.companyData);
        } else {
            setCompany({});
        }
        return () => {
            setCompany({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OriginalCompany.companyData]);

    function handleCancel() {
        setCompany(OriginalCompany.companyData);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const data = {
            ...company,
        };

        if (!OriginalCompany.hasCompany) {
            // se não possuir empresa, cadastrar
            // empresa sempre será criada ativa
            data.ativo = '1';
            console.log('criar');
            console.log(data);
            dispatch(createCompany(data, user.uid));
        } else {
            if (company.ativo === '0') {
                if (
                    !window.confirm(
                        'Tem certeza que deseja desativar essa empresa? a maioria das ações nela serão bloqueadas até ativá-la novamente',
                    )
                ) {
                    setCompany({ ...company, ativo: '1' });
                    return;
                }
            }
            //se possuir empresa. editar
            console.log('editar');
            dispatch(updateCompany(data, user.uid));
        }
    }

    return (
        <ContainerCenter>
            <CompanyOverview>
                {OriginalCompany.hasCompany ? (
                    <CompanyFormWrapper>
                        <form
                            onSubmit={(evt) => {
                                handleSubmit(evt);
                            }}
                        >
                            <Titles>
                                <ContainerBTW>
                                    <Details>
                                        <h3>Criador: {company?.userc?.nome}</h3>
                                        <h3>ID: {company?.id}</h3>
                                    </Details>
                                    <span>
                                        <ContainerR>
                                            <h3>Ativo: </h3>
                                            <input
                                                title="ativo"
                                                type="checkbox"
                                                checked={company?.ativo === '1' ? true : false}
                                                onChange={(e) => {
                                                    setCompany({ ...company, ativo: e.target.checked ? '1' : '0' });
                                                }}
                                            />
                                        </ContainerR>
                                    </span>
                                </ContainerBTW>
                            </Titles>
                            <Input
                                label="Razão social:"
                                placeholder="Razão social"
                                inputValue={company?.razaosocial}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, razaosocial: e.target.value });
                                }}
                            />
                            <Input
                                label="Fantasia:"
                                placeholder="Nome fantasia"
                                inputValue={company?.fantasia}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, fantasia: e.target.value });
                                }}
                            />
                            <Input
                                label="CPNJ/CPF:"
                                placeholder="CPNJ/CPF"
                                inputValue={company?.CNPJ_CPF}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, CNPJ_CPF: e.target.value });
                                }}
                            />

                            <FormButtonsWrapper>
                                <BtCancel
                                    disabled={OriginalCompany.isSaving ? true : isDisabled}
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </BtCancel>
                                <BtSubmit
                                    disabled={hasError ? true : OriginalCompany.isSaving ? true : isDisabled}
                                    type="submit"
                                >
                                    Salvar mudanças
                                </BtSubmit>
                            </FormButtonsWrapper>
                        </form>
                    </CompanyFormWrapper>
                ) : (
                    <CompanyFormWrapper>
                        <form
                            onSubmit={(evt) => {
                                handleSubmit(evt);
                            }}
                        >
                            <Titles>
                                <ContainerCenter>
                                    <span>
                                        <ContainerR>
                                            <h2>Você não possui uma empresa cadastrada, cadastre uma nova abaixo ou espere por um convite</h2>
                                        </ContainerR>
                                    </span>
                                </ContainerCenter>
                            </Titles>
                            <Input
                                label="Razão social:"
                                placeholder="Razão social"
                                inputValue={company?.razaosocial}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, razaosocial: e.target.value });
                                }}
                            />
                            <Input
                                label="Fantasia:"
                                placeholder="Nome fantasia"
                                inputValue={company?.fantasia}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, fantasia: e.target.value });
                                }}
                            />
                            <Input
                                label="CNPJ/CPF:"
                                placeholder="CNPJ/CPF"
                                inputValue={company?.CNPJ_CPF}
                                isValid={null}
                                ocHandler={(e) => {
                                    setCompany({ ...company, CNPJ_CPF: e.target.value });
                                }}
                            />
                            <FormButtonsWrapper>
                                <BtCancel
                                    disabled={OriginalCompany.isSaving ? true : isDisabled}
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </BtCancel>
                                <BtSubmit
                                    disabled={hasError ? true : OriginalCompany.isSaving ? true : isDisabled}
                                    type="submit"
                                >
                                    Salvar mudanças
                                </BtSubmit>
                            </FormButtonsWrapper>
                        </form>
                    </CompanyFormWrapper>
                )}
            </CompanyOverview>
        </ContainerCenter>
    );
}

export default Overview;
