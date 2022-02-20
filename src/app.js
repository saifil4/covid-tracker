import './App.css';
import React from 'react';
import AppRoutes from './appRoutes';
import LeftNavigation from './components/LeftNavigation';
import styled from 'styled-components';

function App() {

  return (
    <>
      <AppContainer>
        <LeftNav>
          <LeftNavigation />
        </LeftNav>
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

const LeftNav = styled.div`
  width: 275px;
  @media (max-width: 576px) {
    display:none;
  }  
`

const Main = styled.div`
  width: calc(100% - 275px);
  @media (max-width: 576px) {
    width:100%;
  }  
`
