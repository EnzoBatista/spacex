import React from "react";
import styled from "styled-components";
import logo from '../../assets/img/spacex-logo.png';

const StyledImage = styled.img`
    height: 80px;
    width: auto;
    filter: brightness(0) invert(1);
    position: relative;
    float: left;
    z-index: 99;
`;

const Brand = () => {
    return(
        <StyledImage src={logo} />
    );
};
export default Brand;