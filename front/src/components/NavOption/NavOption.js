import React from 'react';
import { useNavigate } from 'react-router';
import { AiOutlineAlignCenter as Placeholder } from 'react-icons/ai';
import { OptionWrapper } from './styles';
import { Titles } from '../../styles/styles';
import Tooltip from '@mui/material/Tooltip';
function NavOption({ title, navto, children, isSelected, disabled }) {
    const navigate = useNavigate();

    function handleNavigate() {
        if (!disabled) {
            navto ? navigate(navto) : navigate('/');
        }
    }

    return (
        <Tooltip
            title={disabled ? 'Crie ou entre em uma empresa para acessar' : ''}
            placement="top-start"
            disableInteractive
            arrow
        >
            <OptionWrapper
                disabled={disabled}
                className={isSelected ? 'selected ' : ''}
                onClick={handleNavigate}
            >
                <Titles>
                    {children ? children : <Placeholder />}
                    {title || 'Placeholder'}
                </Titles>
            </OptionWrapper>
        </Tooltip>
    );
}

export default NavOption;
