import './App.css';
import React from 'react';
import Statistics from './pages/statistics';
import CovidMap from './pages/covidmap';
import Vaccine from './pages/vaccine';
import Header from './components/header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SelectedCountryProvider } from "./store/SelectedCountryContext";
import styled from 'styled-components';

function AppRoutes() {

  return (
    <>
      <Router>
        <SelectedCountryProvider>
          <Header />
          <AppContainer>
            <Route path='/' exact component={Statistics} />
            <Route path='/covidmap' component={CovidMap} />
            {/* <Route path='/vaccine' component={Vaccine} /> */}
          </AppContainer>
        </SelectedCountryProvider>
      </Router>
    </>
  );
}

export default AppRoutes;

const AppContainer = styled.div`
    width: 100%;
    height:100vh;
    overflow: auto;
    background: #f9f9f9;
    padding-top: 10px;
    @media(max-width: 575px){
        height: calc(100vh - 56px);
    }

`
