import './App.css';
import React from 'react';
import AppRoutes from './appRoutes';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import { SelectedCountryProvider } from './store/SelectedCountryContext';

function App() {

  return (
    <>
      <SelectedCountryProvider>
        <AppContainer>
          <SidePanel>
            <Sidebar />
          </SidePanel>
          <Main>
            <AppRoutes />
          </Main>
        </AppContainer>
      </SelectedCountryProvider>
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
