import './App.css';
import React from 'react';
import AppRoutes from './appRoutes';
import LeftNavigation from './components/LeftNavigation';
import styled from 'styled-components';

function App() {

  return (
    <>
      <AppContainer>
        <SidePanel>
          <LeftNavigation />
        </SidePanel>
        <Main>
          <AppRoutes />
        </Main>
      </AppContainer>
    </>
  );
}

export default App;


const AppContainer = styled.div`
  width: 100%;
  display: flex;
`

const SidePanel = styled.div`
  width: 325px;
  @media (max-width: 576px) {
    display:none;
  }  
`;

const Main = styled.div`
  width: calc(100% - 325px);
  @media (max-width: 576px) {
    width:100%;
  }  
`
