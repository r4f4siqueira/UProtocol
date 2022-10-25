import React from 'react';
import { useNavigate } from 'react-router';
import { Titles } from '../../styles/styles';
import { TabsWrapper, Tab } from './styles';
import Tooltip from '@mui/joy/Tooltip';

function Tabs(props) {
    const navigate = useNavigate();

    function handleNavigate(navto) {
        // console.log(navto);

        if (navto && typeof navto === 'string') {
            navigate(navto);
        }
    }

    return (
        <TabsWrapper>
            {props?.Tabs?.map((tab) => {
                return (
                    <Tooltip
                        title={tab.disabled ? 'Crie ou entre em uma empresa para acessar' : ''}
                        arrow
                        color="primary"
                        variant="solid"
                        placement="top"
                    >
                        <Tab
                            key={tab.name}
                            onClick={() => {
                                !tab.disabled ? handleNavigate(tab.navto) : console.log('tab desativada');
                            }}
                            disabled={tab.disabled}
                            className={props?.active === tab.navto ? 'active' : ''}
                        >
                            <Titles>
                                {tab.icon}
                                {tab.name}
                            </Titles>
                        </Tab>
                    </Tooltip>
                );
            })}
        </TabsWrapper>
    );
}

export default Tabs;
