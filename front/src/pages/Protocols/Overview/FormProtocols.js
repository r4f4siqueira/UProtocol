//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Dropbox from '../../../components/Dropbox/dropbox';
import Input from '../../../components/Input/Input';

//Actions
import { AuthContext } from '../../../context/auth.tsx';
import { getProtocols, setSelectedProtocol, createProtocol } from '../../../store/actions/protocol.tsx';
import { BtCancel, BtSearch, BtSubmit } from '../../../styles/styles';

// styles
import { ProtocolFormWrapper, FormProtocols as ProtocolsForm } from './styles';

// componentes
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

function FormProtocols() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const customerList = useSelector((state) => state.Customer.customerList);
    const sectorList = useSelector((state) => state.Sector.sectorList);
    const { user } = useContext(AuthContext);

    const [localSelectedProtocol, setLocalSelectedProtocol] = useState();
    const [localFilters, setLocalFilters] = useState();

    const disableSubmit =
        localSelectedProtocol?.pessoaatendida === undefined ||
        localSelectedProtocol?.pessoaatendida === '' ||
        localSelectedProtocol?.pessoaatendida === null ||
        localSelectedProtocol?.motivo === undefined ||
        localSelectedProtocol?.motivo === '' ||
        localSelectedProtocol?.motivo === null ||
        localSelectedProtocol?.cliente === null ||
        localSelectedProtocol?.cliente?.value === null;

    // preenchendo a dropbox
    const customerOptions = [];
    customerList.every((customer, index) => {
        if (customer.ativo) {
            customerOptions[index] = { value: customer.id, label: `${customer.id} - ${customer.fantasia}` };
        }
        return true;
    });

    // preenchendo a dropbox
    const sectorOptions = [];
    sectorList.every((sector, index) => {
        if (sector.ativo) {
            sectorOptions[index] = { value: sector.id, label: `${sector.id} - ${sector.nome}` };
        }
        return true;
    });

    useEffect(() => {
        if (selectedProtocol.id) {
            navigate(`/protocols/details/${selectedProtocol.id}/overview`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProtocol]);

    function handleCancelProtocol() {
        setLocalSelectedProtocol({});
        dispatch(setSelectedProtocol({ cliente: null, motivo: null, pessoaatendida: null }));
    }

    const { tab } = useParams();

    function handleCancelSearch() {
        setLocalFilters({ setor: { value: null } });
        switch (tab) {
            case 'overview':
                dispatch(getProtocols(user.uid, companyId, 'geral'));
                break;
            case 'queue':
                dispatch(getProtocols(user.uid, companyId, 'queue'));
                break;
            case 'finished':
                dispatch(getProtocols(user.uid, companyId, 'finished'));
                break;
            default:
                break;
        }
    }

    async function handleSearchProtocol(evt) {
        evt.preventDefault();
        const data = {
            dataInicial: localFilters?.dataInicial,
            dataFinal: localFilters?.dataFinal,
            setor: localFilters?.setor?.value,
        };
        console.log('enviando para criar: ');
        console.log(data);
    }

    async function handleProtocol(evt) {
        evt.preventDefault();
        // console.log(localSelectedProtocol);
        const data = {
            uid: user.uid,
            empresa: companyId,
            motivo: localSelectedProtocol.motivo,
            pessoaatendida: localSelectedProtocol.pessoaatendida,
            cliente: localSelectedProtocol.cliente.value,
        };
        console.log('enviando para criar: ');
        console.log(data);
        dispatch(createProtocol(data)).then((id) => {
            console.log('id protocolo: ' + id);
            // navigate(`/protocols/details/${id}/overview`);
        });
        handleCancelProtocol();
    }

    return (
        <>
            <Tabs
                aria-label="Basic tabs"
                defaultValue={0}
                variant="outlined"
                sx={(theme) => ({
                    marginY: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    '--Tabs-gap': '0px',
                    [`& .${tabClasses.root}`]: {
                        ':hover': { color: 'primary.400', bgcolor: 'primary.100' },
                        fontWeight: 'lg',
                        bgcolor: 'white',
                        position: 'relative',
                        border: '1px solid #1498d5',
                        borderBottom: '2px solid #1498d5',
                        borderRadius: '0.8rem 0.8rem 0rem 0',
                        marginX: '0.1rem',
                        marginBottom: '0',
                        [`&.${tabClasses.selected}`]: {
                            color: 'primary.500',
                            bgcolor: 'primary.200',
                            border: '2px solid #1498d5',
                            borderBottom: '1px solid #1498d5',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                            outlineOffset: '-3px',
                        },
                    },
                })}
            >
                <TabList>
                    <Tab>
                        <ListItemDecorator>
                            <AiOutlinePlus />
                        </ListItemDecorator>
                        Cadastro
                    </Tab>
                    <Tab>
                        <ListItemDecorator>
                            <AiOutlineSearch />
                        </ListItemDecorator>
                        Pesquisa
                    </Tab>
                </TabList>
                <TabPanel value={0}>
                    <ProtocolsForm>
                        <ProtocolFormWrapper>
                            <form
                                onSubmit={(evt) => {
                                    handleProtocol(evt);
                                }}
                            >
                                <div className="center inputs">
                                    <div className="input">
                                        <Dropbox
                                            label="Cliente:"
                                            options={customerOptions}
                                            ocHandler={(value) => {
                                                setLocalSelectedProtocol({ ...localSelectedProtocol, cliente: value });
                                            }}
                                            inputValue={localSelectedProtocol?.cliente}
                                            search={true}
                                        />
                                    </div>
                                    <div className="input">
                                        <Input
                                            label="Pessoa atendida*: "
                                            noMargin={true}
                                            placeholder="Nome da pessoa atendida"
                                            inputValue={localSelectedProtocol?.pessoaatendida}
                                            isValid={null}
                                            ocHandler={(e) => {
                                                setLocalSelectedProtocol({ ...localSelectedProtocol, pessoaatendida: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="input">
                                        <Input
                                            label="Motivo(Descrição)*:"
                                            noMargin={true}
                                            placeholder="Título do atendimento"
                                            inputValue={localSelectedProtocol?.motivo}
                                            isValid={null}
                                            ocHandler={(e) => {
                                                setLocalSelectedProtocol({ ...localSelectedProtocol, motivo: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="center submit">
                                    <BtCancel
                                        type="button"
                                        onClick={handleCancelProtocol}
                                    >
                                        Cancelar
                                    </BtCancel>
                                    <BtSubmit
                                        disabled={disableSubmit}
                                        type="submit"
                                    >
                                        Criar
                                    </BtSubmit>
                                </div>
                            </form>
                        </ProtocolFormWrapper>
                    </ProtocolsForm>
                </TabPanel>
                <TabPanel value={1}>
                    <ProtocolsForm>
                        <ProtocolFormWrapper>
                            <form
                                onSubmit={(evt) => {
                                    handleSearchProtocol(evt);
                                }}
                            >
                                <div className="center inputs">
                                    <div className="input">
                                        <Input
                                            label="Data inicial:"
                                            noMargin={true}
                                            type="datetime-local"
                                            inputValue={localFilters?.dataInicial}
                                            isValid={null}
                                            ocHandler={(e) => {
                                                setLocalFilters({ ...localFilters, dataInicial: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="input">
                                        <Input
                                            label="Data final:"
                                            noMargin={true}
                                            type="datetime-local"
                                            inputValue={localFilters?.dataFinal}
                                            isValid={null}
                                            ocHandler={(e) => {
                                                setLocalFilters({ ...localFilters, dataFinal: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="input">
                                        <Dropbox
                                            label="Setor:"
                                            options={sectorOptions}
                                            ocHandler={(value) => {
                                                console.log(localFilters);
                                                setLocalFilters({ ...localFilters, setor: value });
                                            }}
                                            inputValue={localFilters?.setor}
                                            search={true}
                                        />
                                    </div>
                                </div>
                                <div className="center submit">
                                    <BtCancel
                                        type="button"
                                        onClick={handleCancelSearch}
                                    >
                                        Cancelar
                                    </BtCancel>
                                    <BtSearch type="submit">
                                        {' '}
                                        <AiOutlineSearch />
                                        Pesquisar
                                    </BtSearch>
                                </div>
                            </form>
                        </ProtocolFormWrapper>
                    </ProtocolsForm>
                </TabPanel>
            </Tabs>
        </>
    );
}
export default FormProtocols;
