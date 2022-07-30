import './App.css';
import React from 'react';
import Statistics from './pages/statistics';
import CovidMap from './pages/covidmap';
import NavBarMobile from './components/navbar/NavBarMobile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import CountrySelectorMobile from './components/country-selector/CountrySelectorMobile';
import { useCountry } from './store/SelectedCountryContext';


function AppRoutes() {

  const { isVisible } = useCountry();

  console.log(isVisible)
  const handleScroll = (e) => {
    console.log(e);
  }

  return (
    <>
      <Router>
        <NavBarMobile />
        {isVisible && <CountrySelectorMobile />}
        <AppContainer onScroll={handleScroll} >
          <Route path='/' exact component={Statistics} />
          <Route path='/covidmap' component={CovidMap} />
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
    height: calc(100vh - 140px);
    @media(min-width: 577px){
        height: 100%
    }

`
