import React from 'react';
import { styled } from '@mui/system';
import { List, Button } from '@mui/material';

const StyledList = styled(List)`
    width: 100%;
    position: absolute!important;
    top: 0;
    padding: 0px!important;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
`;

const Nav = () => {
  return(
    <StyledList>
        <Button variant="text">Home</Button>
        <Button variant="contained">Missions</Button>
        <Button variant="outlined">Contact</Button>
    </StyledList>
  );
};

export default Nav;
