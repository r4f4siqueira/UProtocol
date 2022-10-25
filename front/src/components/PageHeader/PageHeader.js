import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MdArrowBack } from 'react-icons/md';

import { ContainerR, Titles } from '../../styles/styles';
import { BtBack, ContainerPageHeader, PanelPageHeader } from './styles';

function PageHeader({ children, title, onBack }) {
    const navigate = useNavigate();

    function handleBack() {
        if (onBack) {
            onBack();
        }
        navigate(-1);
    }
    return (
        <ContainerPageHeader>
            <PanelPageHeader>
                <BtBack onClick={handleBack}>
                    <MdArrowBack
                        size="2.5rem"
                        color="#ffffff"
                    />
                </BtBack>
                <ContainerR>
                    {children}
                    <Titles>
                        <h1>{title}</h1>
                    </Titles>
                </ContainerR>
            </PanelPageHeader>
        </ContainerPageHeader>
    );
}

export default PageHeader;
