import React from 'react';
// import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import { Card, CardContent } from '@mui/material';
// import Rockets from './components/Rockets/Rockets';
// import RocketsProvider from './store/RocketsProvider';

const StyledCard = styled(Card)`
  position: relative;
  top: -40px;
  max-width: fit-content;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <StyledCard>
          <CardContent sx={{backgroundColor: '#141313'}}>
              {/* <Rockets /> */}
          </CardContent>
        </StyledCard>
      </Main>
    </div>
  );
}

export default App;
