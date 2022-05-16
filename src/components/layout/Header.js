import React from 'react';
import { styled } from '@mui/system';

import Nav from './Nav';
import Brand from '../branding/brand';
import { Backdrop, Container } from '@mui/material';

import bgImage from '../../assets/img/spacex-bg-2.jpeg';

const BgContainer = styled(Container)`
  position: relative;
  height: 300px;
  width: 100%;
  max-width: 100%!important;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
`;

const StyledBackdrop = styled(Backdrop)`
    position: absolute!important;
    height: 100%;
`;

const Header = () => {

  return (
    <BgContainer>
      <StyledBackdrop
        open={true}
      >
        <Nav />
        <Brand />
      </StyledBackdrop>
    </BgContainer>
  );
};
export default React.memo(Header);
