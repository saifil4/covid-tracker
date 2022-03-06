import './App.css';
import React from 'react';
import Statistics from './pages/statistics';
import CovidMap from './pages/covidmap';
import Vaccine from './pages/vaccine';
import NavBarMobile from './components/NavBarMobile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SelectedCountryProvider } from "./store/SelectedCountryContext";
import styled from 'styled-components';

function AppRoutes() {

  const handleScroll = (e) => {
    console.log(e);
  }

  return (
    <>
      <Router>
          <NavBarMobile />
          <AppContainer onScroll={handleScroll} >
            <Route path='/' exact component={Statistics} />
            <Route path='/covidmap' component={CovidMap} />
            {/* <Route path='/vaccine' component={Vaccine} /> */}
          </AppContainer>
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
    @media(max-width: 575px){
        height: calc(100vh - 56px);
    }

`
