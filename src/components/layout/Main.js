import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const StyledMain = styled(Box)`
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background-color: #1a1a1a;
`;

const Main = (props) => {
    return(
        <StyledMain>
            {props.children}
        </StyledMain>        
    );
};

export default Main;
